function A {}

// let aa = new A();


function createAObj(...args) {
  let aa = {}

  aa.__proto__ = A.prototype;

  let result = A.call(aa, ...args);
  
  return result instanceof Object ? result : aa;

}


function createAObj2(...args) {
  // 创建一个新对象，继承A的原型
  let a = Object.create(A.prototype)

  let result = A.call(aa, ...args);
  
  return result instanceof Object ? result : aa;

}
