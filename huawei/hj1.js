const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

(async function() {
    let line;
    while ((line = await readline())) {
        console.log(`你输入的是：${line}`);
        if (line.toLowerCase() === 'exit') break; // 输入 'exit' 结束循环
    }
    console.log('再见！');
    rl.close(); // 关闭 readline 接口
})();