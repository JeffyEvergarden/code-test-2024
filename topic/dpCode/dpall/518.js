/** 518. 零钱兑换 II
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
    假设每一种面额的硬币有无限个。 
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const n = Number(amount);

  const dp = new Array(n + 1).fill(0)

  dp[0] = 1

  for (let j = 0; j < coins.length; j++) {

    const val = Number(coins[j])

    for (let i = val; i <= n; i++) {
      dp[i] = dp[i] + dp[i - val];
    }
    console.log(dp)
  }

  return dp[n]
};

var change2 = function (amount, coins) {
  const n = Number(amount);

  const dp = Array.from({ length: coins.length }, () => new Array(n + 1).fill(0))

  dp[0][0] = 1
  for (let i = 0; i < coins.length; i++) {
    const val = coins[i]
    for (let j = 0; j <= amount; j++) {
      if (i === 0) {
        if (j % val === 0) {
          dp[0][j] = 1
        }
      } else {
        if (j - val >= 0) {
          dp[i][j] = dp[i - 1][j - val] + dp[i - 1][j]
        } else {
          dp[i][j] = dp[i - 1][j]
        }
      }

    }
  }

  return dp[coins.length - 1][amount]
};

console.log(
  change(5, [1, 2, 5])
)
console.log(
  `--------------`
)
console.log(
  change2(5, [1, 2, 5])
)

