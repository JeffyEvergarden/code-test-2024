import { type DiyNumber, type PPLogin, type PPLogin2, getFxOrigin } from './fx'
// import type { DiyNumber, PPLogin } from './fx'

const diyNumber: DiyNumber = 1

console.log(diyNumber, getFxOrigin(diyNumber))

const ppLogin: PPLogin = {
  name: 'John',
  age: 18
}

const ppLogin2: PPLogin2 = {
  name: 'John',
  age: 18
}

console.log(ppLogin, ppLogin2)
