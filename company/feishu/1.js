//  写出输出顺序

var result = [];
var a = 3;
var total = 0;
function foo(a) {
  var i = 0;
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
result[2]();


// 将所有 var 换成let 呢
// 输出顺序变不变