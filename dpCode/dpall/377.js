/**
 * 377. 组合总和 Ⅳ  https://leetcode.cn/problems/combination-sum-iv/description/
 * 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。
   题目数据保证答案符合 32 位整数范围。
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