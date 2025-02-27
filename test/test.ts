interface Address {
  pos: string
  name: string
}

interface Person {
  name: string
  age: number
  address: Address
}

type partialPerson = Partial<Person>

type deepPartial<T> = {
  [key in keyof T]?: deepPartial<T[key]>
}

const t1: deepPartial<Person> = {
  name: '1',
  address: {
    name: '2'
  }
}

const o = {
  x: 'str',
  y: 2,
  z: true
}

type fake = typeof o

function getObj<k extends keyof typeof o>(key: k): fake[k] {
  return o[key]
}

// 期望 valX 的类型是 string
var valX1 = getObj('x')
// 期望 valY 的类型是 number
var valY2 = getObj('y')
