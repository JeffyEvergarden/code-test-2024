/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {

    const dp = new Array(n + 1).fill(0)

    dp[0] = 1
    dp[1] = 1


    // f(i)---> dp(i-1) * dp(n-i)

    //dp[i] = f(1) + f(2).... f(n)


    for (let i = 1; i <= n; i++) {

        let num = 0
        for (let j = 1; j <= i; j++) {
            num = num + dp[j - 1] * dp[i - j]
        }
        dp[i] = num
    }

    console.log(dp)

    return dp[n]
};

console.log(
    numTrees(3);
)