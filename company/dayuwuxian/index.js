function myProxy(total = 0) {
  return new Proxy({}, {
    get(target, key) {
      // 当请求 Symbol.toPrimitive 时，提供一个函数用于转换为原始值
      if (key === Symbol.toPrimitive) {
        console.log(key)
        return () => total;
      }

      // 尝试将属性名转换为数字，并与当前 total 相加
      const num = Number(key);
      return myProxy(num + total);

    },
    // 定义 valueOf 方法以便于隐式类型转换
    // valueOf() {
    //   return total;
    // },
    // // 定义 toString 方法以便于字符串化
    // toString() {
    //   return total.toString();
    // }
  });
}

let add = myProxy(); // 初始化总计值为 0 的代理对象

// 题目:
let r1 = add[1][2]; // 访问属性 '1' 和 '2'
console.log(r1); // 输出 3

let r2 = add[1][2][100]; // 访问属性 '1', '2', 和 '100'
console.log(r2); // 输出 103

// 显示地转换为数字或字符串
console.log(+r1); // 输出 3
console.log(`${r2}`); // 输出 "103"