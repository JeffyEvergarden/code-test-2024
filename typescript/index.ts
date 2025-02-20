interface Person {
  name: string
  age: number
}

type PartialPerson = Partial<Person>
const john: PartialPerson = { name: 'John' }

type DeepPartial<T> = { [k in keyof T]?: DeepPartial<T[k]> }

const obj = {
  x: 'str',
  y: 2,
  z: true
}

// function getObj(key) {
//     return obj[key]
// }

// 期望 valX 的类型是 string
var valX = getObj1('x')
// 期望 valY 的类型是 number
var valY = getObj2(obj, 'y')

// // 强制T数组
// type ArrayType<T> = { … }

function getObj1<K extends keyof typeof obj>(key: K): typeof obj[K] {
  return obj[key]
}

function getObj2<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
