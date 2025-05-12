// 给下面函数作类型定义
// const getOrigin = (args) => args

// 结果：
export const getFxOrigin = <T>(args: T): T => args

export function getFcOrigin<T>(args: T): T {
  return args
}

console.log('window:-----------', window)

export type PPLogin = {
  name: string
  age: number
}

const ppLogin2: PPLogin = {
  name: 'John',
  age: 18
}

export type PPLogin2 = typeof ppLogin2

export type DiyNumber = number