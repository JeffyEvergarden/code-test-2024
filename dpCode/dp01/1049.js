// https://leetcode.cn/problems/last-stone-weight-ii/description/
// 1049. 最后一块石头的重量 II
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var lastStoneWeightII = function (nums) {
  let maxTotal = nums.reduce((a, b) => a + b, 0)

  total = Math.floor(maxTotal / 2)

  console.log(maxTotal, total)
  const len = nums.length
  const dp = new Array(total + 1).fill(0)

  // dp[i][j] 取。 dp[i-1][j-nums[i]] + nums[i]
  // dp[i][j] 不取
  for (let i = 1; i <= total; i++) {
    dp[i] = nums[0] <= i ? nums[0] : 0
  }

  for (let i = 1; i < nums.length; i++) { // 物品
    for (let j = total; j > 0; j--) { // 背包
      if (j - nums[i] >= 0) {
        dp[j] = Math.max(dp[j - nums[i]] + nums[i], dp[j])
      } else {
        dp[j] = dp[j]
      }
    }
  }

  return Math.abs(maxTotal - 2 * dp[total])
};

console.log(
  lastStoneWeightII(
    [2, 7, 4, 1, 8, 1]
  )
)