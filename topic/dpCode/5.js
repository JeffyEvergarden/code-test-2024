/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let a = [...s];
    const len = a.length
    const dp = Array.from({ length: len }, () => new Array(len).fill(false))

    let maxlen = 0

    let maxL = 0

    let maxR = 0

    for (let i = 0; i < len; i++) {
        dp[i][i] = true
    }

    for (let L = 2; L <= len; L++) {
        for (let i = 0; i + L - 1 < len; i++) {
            let right = i + L - 1
            dp[i][right] = L > 2 ? dp[i + 1][right - 1] && a[i] === a[right] : a[i] === a[right]
            if (dp[i][right] && right - i + 1 > maxlen) {
                maxL = i
                maxR = right
                maxlen = right - i + 1
            }
        }
    }

    return s.substring(maxL, maxR + 1)

};

console.log(
    longestPalindrome('bb')
)