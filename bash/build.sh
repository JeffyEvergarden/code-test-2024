#/usr/bin/env bash

# 获取当前工作目录的绝对路径
BASEDIR=$(pwd) # /Users/jeffy/Documents/web/pikpak-ssr
# 获取当前目录的名称
PRONAME=$(basename $BASEDIR) # pikpak-ssr
# 获取当前目录的父目录路径
DIRNAME=$(dirname $BASEDIR) # /Users/jeffy/Documents/web
# 定义脚本版本号
VERSION="1.0"

# 定义帮助信息函数
function usage() {
    echo "Usage: docker_build.sh -p product [-f Dockerfile] [-s \"image_build_script [params...]\"] [-x push_to_other_xops_projects] [-X only_push_to_xops_projects]"
    echo "-p mean product value of alpha or beta, default: alpha"
    echo "-f mean dockerfile name"
    echo "-s mean build image scripts(support parameters)"
    echo "-d debug mode"
    echo "-n docker image name"
    echo "-V mean show VERSION"
    echo "-a means: the addition args when docker build"
    echo "-x 将当前版本推送到其他的xops项目，可以是一个或多个，同时也会推送到默认的项目。example: '-x project1,project2'"
    echo "-X 将当前版本推送到其他的xops项目，可以是一个或多个，但不推送到默认的项目。example: '-X project1,project2'"
}

usage

# 获取父目录名称作为镜像仓库目录
folder=$(basename $DIRNAME) # web
# 初始化变量
docker_args=""  # Docker构建参数
dockerfile="Dockerfile"  # 默认Dockerfile名称
debug=""  # 调试模式标志
image_build_script=""  # 镜像构建脚本
product="alpha"  # 环境类型：release/beta/test/alpha

# 根据目录类型设置默认仓库名称
if [[ "$folder" == "server" || "$folder" == "web" ]]; then
    default_repo="$folder/$PRONAME" # web/pikpak-ssr
else
    default_repo="others/${folder}-${PRONAME}" # others/web-pikpak-ssr
fi
default_repo=$(echo "$default_repo" | tr '_' '-')  # 将下划线替换为中划线
shared_repo=""  # 用于存储其他xops项目名称

# 解析命令行参数
while getopts "f:p:s:a:n:T:r:x:X:" option; do
    case "$option" in
    f)
        dockerfile="$OPTARG"  # 指定Dockerfile名称
        ;;
    p)
        product="$OPTARG"  # 指定产品环境
        ;;
    d)
        debug="debug"  # 启用调试模式
        ;;
    s)
        image_build_script="$OPTARG"  # 指定镜像构建脚本
        ;;
    n)
        PRONAME="$OPTARG"  # 指定项目名称
        ;;
    V)
        echo "version:$VERSION"  # 显示版本信息
        ;;
    a)
        docker_args="$OPTARG"  # 添加Docker构建参数
        ;;
    x)
        shared_repo=$(echo "$OPTARG" | sed -E 's/\s//g')  # 设置共享仓库，去除空格
        ;;
    X)
        shared_repo=$(echo "$OPTARG" | sed -E 's/\s//g')  # 设置共享仓库，去除空格
        default_repo=""  # 清空默认仓库
        ;;
    r)
        echo "WARNING: param -r is ignored."  # 忽略-r参数
        ;;
    T)
        echo "WARNING: param -T is ignored."  # 忽略-T参数
        ;;
    \?)
        usage
        exit 1
        ;;
    esac
done

# 设置Docker仓库相关配置
registry="pp-registry.tencentcloudcr.com"  # Docker仓库地址
registryUser='tcr$pikpak'  # 仓库用户名
registryFolder="xlco"  # 默认仓库文件夹
if [[ "$folder" == "docker" ]]; then
    registryFolder=docker
fi

# 处理项目名称
if [[ $(echo $folder | grep -c -E '^(server|mac|web|pc|android|docker|ios)$') -eq 0 ]]; then
    PRONAME="${folder}-${PRONAME}"
fi

# 登录Docker仓库
docker login $registry -u "$registryUser" -p "$REGISTRY_PASSWORD" 2>&1 | grep -v -i -E 'warning|credential-stores'

# 输出构建信息
echo "image build script: ${image_build_script}"
echo "registry: ${registry}, folder:${registryFolder}"
echo "target image name: ${PRONAME}"
echo "xops default_repo: $default_repo"
echo "xops shared_repo: $shared_repo"

# 检查并设置镜像构建脚本
if [[ -n "${image_build_script}" && -f "$(echo ${image_build_script} | awk '{print $1}')" ]]; then
    echo "image_build_script: $image_build_script"
    chmod +x $(echo ${image_build_script} | awk '{print $1}')
fi

if [[ "$image_build_script" == "" ]]; then
    image_build_script="docker build"
fi

# 验证目录参数
if [[ ${#folder} -lt 2 ]]; then
    echo "folder arg-1 must set"
    usage
    exit 1
fi

# 输出构建环境信息
echo "gitlab folder: $folder "
echo "product: $product "
echo "Dockerfile: $dockerfile"
dockerFileName="$(basename $dockerfile)"
ext=$(echo "$dockerFileName" | awk -F "-" '{print $2}')
echo "ext: $ext"
echo "env.CI_COMMIT_SHORT_SHA: $CI_COMMIT_SHORT_SHA"
echo "env.CI_COMMIT_REF_NAME: $CI_COMMIT_REF_NAME"

# 验证Dockerfile名称格式
if [[ ${dockerFileName} != "Dockerfile" && "x$ext" == "x" ]]; then
    echo 'docker name format error: Dockerfile-$subsystem'
    usage
    exit 1
fi
if [[ "x$ext" != "x" ]]; then
    ext="$ext-"
fi

# 设置版本标签
ref_name=""
tag_name=""
pre_ref_name=${CI_COMMIT_SHORT_SHA}
pre_tag_name=""

# 根据产品环境设置标签
if [[ $product == "release" ]]; then
    pre_tag_name=test-$pre_ref_name
fi

if [[ $product == "beta" ]]; then
    pre_tag_name=alpha-$pre_ref_name
fi

if [[ $product == "release" || $product == "beta" ]]; then
    ref_name=$CI_COMMIT_REF_NAME
    tag_name=$ref_name
elif [[ $product == "test" || $product == "alpha" ]]; then
    ref_name=${CI_COMMIT_SHORT_SHA}
    tag_name=${product}-${ref_name}
else
    echo "product arg-2 != release or beta or alpha or test"
    usage
    exit 1
fi

# 定义清理镜像的函数
function rm_images() {
    docker rmi ${registry}/${registryFolder}/${PRONAME}:${ext}${tag_name}
    docker rmi ${registry}/${registryFolder}/${PRONAME}:${ext}latest
    # 将 $PRONAME 中的下划线替换为中划线，也清理
    name2=$(echo $PRONAME | tr '_' '-')
    if [[ "$PRONAME" != "$name2" ]]; then
        docker rmi ${registry}/${registryFolder}/${name2}:${ext}${tag_name}
        docker rmi ${registry}/${registryFolder}/${name2}:${ext}latest
    fi
    exit $1
}

# 定义标记镜像的函数
function tag_image() {
    local args="${registry}/${registryFolder}/${PRONAME}:${ext}${tag_name} ${registry}/${registryFolder}/${PRONAME}:${ext}$1"
    if [[ "$debug" == "debug" ]]; then
        echo debug:docker tag $args
    else
        docker tag $args
        if [[ $? != 0 ]]; then
            rm_images -1
        fi
    fi
}

# 定义推送镜像的函数
function push_image() {
    local image="${registry}/${registryFolder}/${PRONAME}:${ext}$1"
    if [[ "$debug" == "debug" ]]; then
        echo debug:docker push $image
    else
        echo "$(date '+%F %T') start push image"
        startTS=$(date +%s)
        docker push $image
        finishTS=$(date +%s)
        echo "$(date '+%F %T') finish push image, time cost: $((finishTS - startTS))"
        if [[ $? != 0 ]]; then
            rm_images -1
        fi
    fi

    # 将 $PRONAME 中的下划线替换为中划线，也推送一份
    name2=$(echo $PRONAME | tr '_' '-')
    if [[ "$PRONAME" != "$name2" ]]; then
        local image2="${registry}/${registryFolder}/${name2}:${ext}$1"
        docker tag $image $image2
        echo "$(date '+%F %T') start push image"
        startTS=$(date +%s)
        docker push $image2
        finishTS=$(date +%s)
        echo "$(date '+%F %T') finish push image, time cost: $((finishTS - startTS))"
        if [[ $? != 0 ]]; then
            rm_images -1
        fi
    fi
}

# 启用命令追踪
set -o xtrace

# 根据产品环境执行不同的构建策略
if [[ $product == "test" || $product == "alpha" ]]; then
    registry_repo="${registry}/${registryFolder}/${PRONAME}:${ext}${tag_name}"
    ${image_build_script} -f $dockerfile -t ${registry_repo} ${docker_args} ./
    if [[ $? != 0 ]]; then
        rm_images -1
    fi
else
    docker pull ${registry}/${registryFolder}/${PRONAME}:${ext}${pre_tag_name}
    if [[ $? != 0 ]]; then
        rm_images -1
    fi
    docker tag ${registry}/${registryFolder}/${PRONAME}:${ext}${pre_tag_name} ${registry}/${registryFolder}/${PRONAME}:${ext}${tag_name}
fi

# 推送镜像
push_image ${tag_name}

# 标记并推送latest版本
tag_image latest
push_image latest

# 更新xops发布平台的版本信息
for repo in $(echo $default_repo $shared_repo | tr ',' ' '); do
    xops_update_version.py -t ${tag_name} -p $product -r "$repo"
done

# 清理镜像并退出
rm_images 0
