/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    const len = matrix.length

    const dp = Array.from({ length: len }, () => new Array(len).fill(0))



    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (i === 0) {
                dp[i][j] = matrix[i][j]
            } else if (len === 1) {
                dp[i][j] = dp[i - 1][j] + matrix[i][j]
            } else if (j === 0) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j + 1]) + matrix[i][j]
            } else if (j === len - 1) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + matrix[i][j]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i - 1][j + 1]) + matrix[i][j]
            }
        }

    }

    let min = Infinity

    for (let i = 0; i < len; i++) {
        if (min > dp[len - 1][i]) {
            min = dp[len - 1][i]
        }
    }

    // console.log(dp)
    return min
};

minFallingPathSum(
    [[2, 1, 3], [6, 5, 4], [7, 8, 9]]
)

