/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {

  // dp[i] 表是 以i位置结尾的最大序列合
  const dp = new Array(nums.length).fill(0);


  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    d[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  }

  let max = -Infinity
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(dp[i], max)
  }

  return max
};