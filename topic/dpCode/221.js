// https://leetcode.cn/problems/maximal-square/?envType=study-plan-v2&envId=dynamic-programming
// 221. 最大正方形
var maximalSquare = function (matrix) {

    const len = matrix.length;

    const columnLen = matrix[0].length

    const dp = Array.from({ length: len }, () => new Array(len).fill(0))

    let max = 0

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < columnLen; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = Number(matrix[i][j])
            } else if (matrix[i][j] === '0') {
                dp[i][j] = 0
            } else {
                dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
            }

            if (dp[i][j] * dp[i][j] > max) {
                max = dp[i][j] * dp[i][j]
            }
        }
    }
    // console.log(matrix)
    // console.log(dp)

    return max
};

console.log(
    maximalSquare([["1", "1", "1", "1", "0"], ["1", "1", "1", "1", "0"], ["1", "1", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["0", "0", "1", "1", "1"]])
)