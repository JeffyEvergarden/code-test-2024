// 实现一个柯里化函数 sum() ，满足以下条件

// 题目描述
// sum(2,3,4)=9​
// sum(2)(3,4)=9​
// sum(2)(3)(4)=9​
// sum(2,3)(4)=9


function sum(...args) {
    let arr = []
    const max = 3
    if (arr.length >= max) {
        return arr.reduce((a, b) => a + b, 0)
    }

    const _sum = (...args2) => {
        arr = arr.concat(...args2)
        if (arr.length >= max) {
            return arr.reduce((a, b) => a + b, 0)
        } else {
            return _sum
        }
    }

    return _sum
}

function sum(...args) {
    let arr = [...args]

    const _sum = (...args2) => {
        arr = arr.concat(...args2)
        return _sum
    }

    _sum.valueOf = () => {
        return arr.reduce((a, b) => a + b, 0)
    }

    _sum.toString = () => {
        return arr.reduce((a, b) => a + b, 0)
    }

    return _sum
}

console.log(+sum(1)(2, 3))