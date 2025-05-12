// 该场景是背包容量为j最多个数

const weight = [1, 3, 4]
const price = [15, 20, 30]

// 01 背包， 0-i种物品(每个物品只有1个)，放的背包容量为k的里最大个数
// 二维
function package01(weight, price, maxWeight) {
  const len = weight.length;
  const dp = Array.from({ length: len }, () => new Array(maxWeight + 1).fill(0))

  // 初始化
  for (let i = 0; i < len; i++) {
    dp[i][0] = 0
  }
  for (let i = 0; i <= maxWeight; i++) {
    dp[0][i] = weight[0] <= i ? 1 : 0
  }

  // dp[i][j] = 放。 dp[i][j-weight[i]] + 1
  //          = 不放。dp[i-1][j]

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= maxWeight; j++) {
      if (j - weight[i] >= 0) {
        dp[i][j] = Math.max(dp[i - 1][j - weight[i]] + 1, dp[i - 1][j])
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  console.log(dp)
  return dp[len - 1][maxWeight]
}
console.log(
  package01(weight, price, 7)
)

