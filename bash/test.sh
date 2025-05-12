# 获取当前工作目录的绝对路径
BASEDIR=$(pwd)
# 获取当前目录的名称
PRONAME=$(basename $BASEDIR)
# 获取当前目录的父目录路径
DIRNAME=$(dirname $BASEDIR)

echo "BASEDIR: $BASEDIR"
echo "PRONAME: $PRONAME"
echo "DIRNAME: $DIRNAME"
    