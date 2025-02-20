// 给下面函数作类型定义
// const getOrigin = (args) => args

// 结果：
const getFxOrigin = <T>(args: T): T => args

function getFcOrigin<T>(args: T): T {
  return args
}
