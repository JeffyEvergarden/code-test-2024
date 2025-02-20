interface Person {
  name: string
  age: number
  next?: Person2
}

interface Person2 {
  name: string
  age: number
  fakename: string
}

type NewPerson = Partial<Person>

type MyDeepPartial<T> = {
  [key in keyof T]?: MyDeepPartial<T[key]>
}

const myObj: MyDeepPartial<Person> = {
  age: 10,
  next: {
    name: 'we'
  }
}

// ------------------------
interface TestObj {
  x: string
  y: number
  z: boolean
}

const testObj = {
  x: 'str',
  y: 2,
  z: true
}

type ObjDefine = typeof testObj

type keys = keyof TestObj

function getKey<key extends keyof ObjDefine>(k: key): ObjDefine[key] {
  return testObj[k]
}

function getKey2<key extends keyof TestObj>(k: key): TestObj[key] {
  return testObj[k]
}

function getKeyByObj<T, key extends keyof T>(obj: T, k: key): T[key] {
  return obj[k]
}

const val: keys = 'z'

const x = getKey('x')
