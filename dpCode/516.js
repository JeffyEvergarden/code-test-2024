/**
 * 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
 * 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {

    const len = s.length

    if (len === 0) {
        return 0
    }

    const str = [...s]

    const dp = Array.from({ length: len }, () => new Array(len).fill(0))

    for (let i = 0; i < len; i++) {
        dp[i][i] = 1
    }

    // dp 推导公式
    // str[i] = str[j]  ====> dp[i+1][j-1] + 2
    // str[i] =======> Math.max(dp[i][j-1], dp[i+1][j])

    // 遍历顺序
    // dp[i][j - 1]-----> dp[i][j]
    // dp[i + 1][j - 1]    dp[i + 1][j]

    let length = 1

    for (let i = len - 1; i >= 0; i--) {
        for (let j = 0; j < len; j++) {
            if (i > j) {
                dp[i][j] = 0
            } else if (i < j) {
                if (str[i] === str[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2
                } else {
                    dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j])
                }

                if (dp[i][j] > length) {
                    length = dp[i][j]
                }
            }
        }
    }

    return length

};

console.log(
    longestPalindromeSubseq('bbcba')
)