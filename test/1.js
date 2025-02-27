function getCoinsWay(coins, n) {

    const dp = new Array(n + 1).fill(0)

    dp[0] = 1

    for (let i = 0; i < coins.length; i++) {

        const val = coins[i]

        for (let j = 1; j <= n; j++) {
            if (j - val >= 0) {
                dp[j] = dp[j] + dp[j - val]
            }
        }

    }

    return dp[n]
}

console.log(
    getCoinsWay([1, 2, 5, 10], 5)
)
// 1、1、1、1、1
// 1、1、1、2
// 1、2、2
// 5