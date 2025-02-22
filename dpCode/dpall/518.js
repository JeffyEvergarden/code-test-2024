/**
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
          dp[i][j] = dp[i][j - val] + dp[i - 1][j]
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

