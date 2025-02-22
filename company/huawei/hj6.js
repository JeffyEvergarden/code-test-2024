const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let num = Number(await readline());

    let res = '';



    for(let i = 2; i * i < num; i++) {

        while(num % i === 0) {
            
            res = res + i +' '

            num = num / i;
        }

    }

    if(num > 1) {
        res = res + num
    }

    console.log(res);


}()
