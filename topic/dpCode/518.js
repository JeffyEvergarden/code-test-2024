
/** xxxxxxxxxxxxxxxxxxxxxxx
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {

    const n = Number(amount);

    const dp = Array.from({ length: coins.length }, () => new Array(n + 1).fill(0))

    console.log(dp);

    // dp [i] [j] ----> 0-i 的物品任意放到 容量为 j 的方法种类
    // i 放， dp[i][j] = dp[i][j - val]
    // i 不放 dp[i][j] = dp[i-1][j]
    // dp[i][j] = dp[i][j - val] + dp[i - 1][j]

    // 初始化 容量为0的方法就是 
    for (let i = 0; i < coins.length; i++) {
        dp[i][0] = 0
    }

    for (let i = 1; i <= n; i++) {
        dp[0][i] = n % coins[0] === 0 ? 1 : 0
    }


    for (let i = 1; i < coins.length; i++) {
        const val = coins[i]
        for (let j = 1; j <= n; j++) {
            if (j - val < 0) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i][j - val] + dp[i - 1][j]
            }

        }
    }
    console.log(dp);

    return dp[coins.length - 1][n]
};


console.log(change(5, [1, 2, 5]))