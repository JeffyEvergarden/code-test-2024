/** 64. 最小路径和
 * https://leetcode.cn/problems/minimum-path-sum/description/?envType=study-plan-v2&envId=dynamic-programming
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    const m = grid.length - 1;

    const n = grid[0].length - 1;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1))



    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 && j === 0) {
                dp[i][j] = grid[i][j]
            } else if (i === 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j]
            } else if (j === 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
            }
        }
    }
    console.log(grid)
    console.log(dp)

    return dp[m][n]

};


minPathSum([[1, 2, 3], [4, 5, 6]])