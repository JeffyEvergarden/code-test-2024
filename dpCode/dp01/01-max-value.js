// 该场景是最大价值

const weight = [1, 3, 4]
const price = [15, 20, 30]

// 01 背包， 0-i种物品(每个物品只有1个)，放的背包容量为k的里最大价值
// 二维
function package01(weight, price, maxWeight) {
  const len = weight.length;
  const dp = Array.from({ length: len }, () => new Array(maxWeight + 1).fill(0))

  // 初始化
  for (let i = 0; i < len; i++) {
    dp[i][0] = 0
  }
  for (let i = 0; i <= maxWeight; i++) {
    dp[0][i] = weight[0] <= maxWeight ? price[0] : 0
  }

  // dp[i][j] = 放。 dp[i][j-weight[i]] + price[i]
  //          = 不放。dp[i-1][j]

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= maxWeight; j++) {
      if (j - weight[i] >= 0) {
        dp[i][j] = Math.max(dp[i - 1][j - weight[i]] + price[i], dp[i - 1][j])
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[len - 1][maxWeight]
}
console.log(
  package01(weight, price, 3)
)

function package01(weight, price, maxWeight) {
  const len = weight.length;
  const dp = Array.from({ length: maxWeight + 1 }, () => 0)

  // 初始化
  for (let i = 0; i <= maxWeight; i++) {
    dp[i] = weight[0] <= maxWeight ? price[0] : 0
  }

  // dp[j] = 放。 dp[j-weight[i]] + price[i]
  //          = 不放。[j]

  for (let i = 1; i < len; i++) {
    for (let j = maxWeight; j >= 0; j--) {
      if (j - weight[i] >= 0) {
        dp[j] = Math.max(dp[j - weight[i]] + price[i], d[j])
      } else {
        dp[j] = dp[j]
      }
    }
  }

  return dp[len - 1][maxWeight]
}