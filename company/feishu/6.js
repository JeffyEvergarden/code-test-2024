
//  写出输出顺序

let result = [];
let a = 3;
let total = 0;
function foo(a) {
  for (let i = 0; i < 3; i++) {
    result[i] = function () {
      total += i * a;
      console.log(i);
    }
  }
}

foo(1);
result[0]();
result[1]();
result[2]();