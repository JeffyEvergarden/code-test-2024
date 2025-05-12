// 原型链继承
function person() {
  this.obj = {
    age: 10,
  }
  this.speack = function () {
    console.log('父元素')
  }
}
person.prototype.name = 'tom'

//子元素
function Son(name) {}

Son.prototype = new person() //原型链继承
let p1 = new Son()

// 借用构造函数继承
function Son2(name) {
  person.call(this)
}

let p2 = new Son2()

console.log(p1, p2)

// 组合继承
function Son3(name) {
  person.call(this)
}

Son3.prototype = new person()

let p3 = new Son3()

console.log(p3)
