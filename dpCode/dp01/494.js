/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var findTargetSumWays = function (nums, target) {
  target = Math.abs(target)
  let total = nums.reduce((a, b) => a + b, 0)
  total = total - target
  if (total % 2 === 1 || total < 0) {
    return 0
  }
  total = total / 2 + target


  const len = nums.length
  const dp = Array.from({ length: len }, () => new Array(total + 1).fill(0));

  dp[0][0] = 1

  if (nums[0] <= total) {
    dp[0][nums[0]] = 1
  }

  if (nums[0] === 0) {
    dp[0][0] = 2
  }

  // console.log(dp)
  // 0-i个物品放置到容量为j的下，有多少种方法
  // dp[i][j] = 放 dp[i-1][j-nums[i]]
  //            不放 dp[i-1][j]

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j <= total; j++) {
      if (j - nums[i] >= 0) {
        dp[i][j] = dp[i - 1][j - nums[i]] + dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  console.log(dp[1])
  return dp[nums.length - 1][total]
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays2 = function (nums, target) {
  target = Math.abs(target)
  let total = nums.reduce((a, b) => a + b, 0)
  total = total - target
  if (total % 2 === 1 || total < 0) {
    return 0
  }
  total = total / 2 + target
  console.log(total);
  const len = nums.length
  const dp = new Array(total + 1).fill(0)

  dp[0] = 1
  // dp[i][j] 放。 dp[i-1][j-nums[i]]
  // dp[i][j] 不放。dp[i-1][j]
  for (let i = 1; i <= total; i++) {
    dp[i] = nums[0] === i ? 1 : 0
  }
  if (nums[0] === 0) {
    dp[0] = 2
  }
  // console.log(dp)

  for (let i = 1; i < nums.length; i++) { // 物品
    for (let j = total; j >= 0; j--) { // 背包
      if (j - nums[i] >= 0) {
        dp[j] = dp[j - nums[i]] + dp[j]
      } else {
        dp[j] = dp[j]
      }
    }
  }

  return dp[total]
};

console.log(
  findTargetSumWays(arr, 6)
)

console.log(
  findTargetSumWays2(arr, 6)
)