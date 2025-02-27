
//  写出输出顺序

let result = [];
let a = 3;
let total = 0;
function foo(a) {
  let i = 0
  for (; i < 3; i++) {
    result[i] = function () {
      total += i * a;
      console.log(total);
    }
  }
}

foo(1);
result[0]();
result[1]();
const fn = result[2]
fn();