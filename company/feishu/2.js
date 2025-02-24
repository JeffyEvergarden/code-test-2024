
/** 
 * 输入一个 n 返回 0 到 n-1 非重复乱序数组 
 * @param {number} n
 * @return {number[]}
 */

function getArray(n) {
    const arr = []

    for (let i = 0; i < arr.length; i++) {
        arr.push(i)
    }
    let k = n;
    while (k >= 0) {
        let i = Math.floor(Math.random() * n);
        let j = Math.floor(Math.random() * n);
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        k--
    }

    return arr;
}

getArray(5) // [2,3,4,0,5]


/** 
 * 进阶
  输入一个 n 返回 0 到 n-1 非重复乱序数组  ，数组长度为l， 必要元素为Required[]
 * @param {number} n
 * @param {number} l  最后数组长度
 *  @param {number[]} required  必须包含的元素
 * @return {number[]}
*/
function getArray(n, l, required) {
    let num = 0
    const set = new Set()
    const arr = []

    for (let i = 0; i < required.length; i++) {
        set.add(required[i])
        arr.push(required[i])
        num++
    }
    // 这里还有什么优化空间 

    let i = Math.floor(Math.random() * n);
    for (; i < n; i++) {
        if (num > l) {
            break
        }
        i = i % n
        if (set.has(i)) {
            continue
        }
        arr.push(i)
        num++
    }

    let k = arr.length;
    console.log(arr)
    while (k >= 0) {
        let i = Math.floor(Math.random() * arr.length);
        let j = Math.floor(Math.random() * arr.length);
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        k--
    }

    return arr;
}

getArray(10, 5, [1, 3, 5])

