// 322. 零钱兑换  https://leetcode.cn/problems/coin-change/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // dp[j]最少物品
  // math.min(dp[i-coins[j]] +1, dp[i])

  const dp = new Array(amount + 1).fill(Infinity)

  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j <= coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
};

console.log(
  coinChange(
    [1, 2, 5],
    11
  )
)