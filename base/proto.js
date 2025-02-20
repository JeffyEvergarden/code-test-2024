class A {
  constructor() {
    this.fake = 10
  }
}

const a = new A()

class B extends A {
  constructor() {
    super()
    this.fake = 20
  }
}

const b = new B()

const ao = a.__proto__
const bo = b.__proto__

console.log(bo instanceof A);

// 
console.log('a.__proto__ === A.prototype:', a.__proto__ === A.prototype)

// a   A {fake: 10}
// a.__proto__  {} 
//  a.__proto__.__proto__     {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__.....}
//  a.__proto__.__proto__.__proto__         null



