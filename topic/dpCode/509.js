/** 1137. 第 N 个泰波那契数
 *  https://leetcode.cn/problems/n-th-tribonacci-number/?envType=study-plan-v2&envId=dynamic-programming
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    const arr = new Array(n + 1)
    arr[0] = 0
    arr[1] = 1

    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }

    return arr[i]
};