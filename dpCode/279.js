/**
 * 完全平方数
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = new Array(1 + n).fill(0)

    // dp[i] ----> dp[]
    dp[0] = 0



    for (let i = 1; i <= n; i++) {

        let min = Infinity

        for (let j = 1; j * j <= i; j++) {
            const val = 1 + dp[i - j * j]
            if (val <= min) {
                min = val
            }
        }

        dp[i] = min
    }

    console.log(dp)

    return dp[n]

};

console.log(numSquares(12))