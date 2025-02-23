function myProxy(total = 0) {
  return new Proxy({}, {
    get(target, key) {
      if (key === Symbol.toPrimitive) {
        return () => total
      }

      return myProxy(Number(key) + total);
    },
  });
}





let add = myProxy()

// 题目:
let r1 = add[1][2]
console.log(r1) // 3

let r2 = add[1][2][100]
console.log(r2) // 103

// 把 add 实现一下