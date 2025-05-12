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
 var minimumDeleteSum = function (word1, word2) {

    const m = word1.length;
    const n = word2.length

    word1 = ['0', ...word1]
    word2 = ['0', ...word2]


    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))


    // console.log(dp)

    let total = 0
    for (let i = 1; i <= m; i++) {
        total = word1[i].charCodeAt(0) + total
        dp[i][0] = total
    }
    total = 0
    for (let i = 1; i <= n; i++) {
        total = word2[i].charCodeAt(0) + total
        dp[0][i] = total
    }

    // console.log(dp)

    // dp推导公式
    // word1[i] === word2[j] ------> dp[i][j] = dp[i-1][j-1]  
    // word1[i] != word2[j] ----------> 

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i] === word2[j]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                const iCode = word1[i].charCodeAt(0)
                const jCode = word2[j].charCodeAt(0)
                dp[i][j] = Math.min(dp[i - 1][j - 1] + jCode + iCode, dp[i - 1][j] + iCode, dp[i][j - 1] + jCode)
            }
        }
    }

    // console.log(dp)

    return dp[m][n]
};


console.log(
    minimumDeleteSum('delete', 'leet')
)