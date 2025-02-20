/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {



    const m = word1.length;
    const n = word2.length

    word1 = ['0', ...word1]
    word2 = ['0', ...word2]
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))


    // console.log(dp)

    for (let i = 1; i <= m; i++) {
        dp[i][0] = i
    }

    for (let i = 1; i <= n; i++) {
        dp[0][i] = i
    }

    // dp推导公式
    // word1[i] === word2[j] ------> dp[i][j] = dp[i-1][j-1]  
    // word1[i] != word2[j] ----------> 

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i] === word2[j]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
            }
        }
    }

    // console.log(dp)

    return dp[m][n]
};
console.log(
    minDistance('horse', 'ros')
)