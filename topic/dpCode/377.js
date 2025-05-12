/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const n = Number(target);

  const dp = Array.from({ length: n + 1 }, () => 0)

  dp[0] = 1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i >= nums[j]) {
        dp[i] += dp[i - nums[j]]
      }
    }
  }


  return dp[n]

};

console.log(combinationSum4(
  [1, 2, 3],
  4
))