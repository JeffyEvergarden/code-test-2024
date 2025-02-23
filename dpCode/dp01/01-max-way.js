// 可以参考 leetcode 494. 目标和
//  https://leetcode.cn/problems/target-sum/

// 该场景是背包容量为k，能有多少种方法
const weight = [1, 3, 4]

// 01 背包， 0-i种物品(每个物品只有1个)，能有多少种方法
// 二维
function package01(weight, maxWeight) {
  const len = weight.length;
  const dp = Array.from({ length: len }, () => new Array(maxWeight + 1).fill(0))
  // 动归定义
  // 0-i个物品，放入容量为j的背包里，有dp[i][j]种方法

  // 初始化 0-i个物品放入背包容量为0的方法只有1种
  for(let i = 0; i < len; i++) {
    dp[i][0] = 1
  }

  dp[0][weight[0]] = 1


  // dp[i][j] = 放。 dp[i-1][j-weight[i]]
  //          = 不放。dp[i-1][j]
  // dp[i][j] = 放的方法 + 不放的方法
  // dp[i][j] = dp[i-1][j] + dp[i-1][j-weight[i]]

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= maxWeight; j++) {
      if (j - weight[i] >= 0) {
        // 放得下
        dp[i][j] = dp[i - 1][j - weight[i]] + dp[i - 1][j]
      } else {
        // 放不了
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  console.log(dp)

  return dp[len - 1][maxWeight]
}
console.log(
  package01(weight, 4)
)

