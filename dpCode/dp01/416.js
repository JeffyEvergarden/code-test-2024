// 416. 分割等和子集

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let total = nums.reduce((a, b) => a + b, 0)
  if (total % 2 === 1) {
    return false
  }
  total = total / 2
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

  return dp[total] === total

};

// 416. 分割等和子集

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition2 = function (nums) {
  let total = nums.reduce((a, b) => a + b, 0)
  if (total % 2 === 1) {
    return false
  }
  total = total / 2
  const len = nums.length
  const dp = new Array(total + 1).fill(0)


  for (let i = 0; i < len; i++) {
    for (let j = total; j >= 0; j--) {
      if (j - nums[i] >= 0) {
        dp[j] = Math.max(dp[j - nums[i]] + nums[i], dp[j])
      } else {
        dp[j] = dp[j]
      }
    }
  }


  return dp[total] === total

};