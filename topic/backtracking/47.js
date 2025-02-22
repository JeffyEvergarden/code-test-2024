/**
 * 46. 全排列
 * https://leetcode.cn/problems/permutations/description/
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = []
  const len = nums.length
  nums.sort((a, b) => a - b)
  let used = new Array(len).fill(0)

  function backtracking(stack) {

    if (stack.length === len) {
      result.push([...stack])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i] === 1) {
        continue
      }
      if (i >= 0 && nums[i] === nums[i - 1] && used[i - 1] === 0) {
        continue
      }
      used[i] = 1
      stack.push(nums[i])
      backtracking(stack)
      used[i] = 0
      stack.pop()
    }
  }
  backtracking([])

  return result;
};

console.log(
  permute([1, 2, 2, 3])
)