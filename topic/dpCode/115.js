/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var numDistinct  = function (word1, word2) {

    const m = word1.length;
    const n = word2.length

    word1 = ['0', ...word1]
    word2 = ['0', ...word2]


    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))


    // console.log(dp)

    // 初始化
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 1
    }
    for (let i = 1; i <= n; i++) {
        dp[0][i] = 0
    }

    // console.log(dp)

    // dp推导公式
    // word1[i] === word2[j] ------> dp[i][j] = dp[i-1][j-1]  
    // word1[i] != word2[j] ---------->  d[i][j] ----------> d[k][j] &&  word1[k] ==== word2[j]
    // -------------

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            if (i < j) {
                dp[i][j] = 0
            } else if (word1[i] === word2[j]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    // console.log(dp)

    return dp[m][n]
};


console.log(
    numDistinct('rabbbit', 'rabbit')
)