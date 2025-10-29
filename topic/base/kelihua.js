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


// 科里化
function keli(nums) {
    let len = nums
    let k = 0

    let total = 0
    const dispath = (i) => {
        return (val) => {
            total = total + val
            if (i == len - 1) {
                return total
            }
            return dispath(i + 1)
        }
    }
    return dispath(0)
}

// 动态柯里化

let x = keli(2)

x(1)(2)