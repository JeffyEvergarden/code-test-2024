/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let result = []
  const len = nums.length
  function backtracking(stack, start) {
      if (start > nums.length) {
          return
      }
      result.push([...stack])
      for (let i = start; i < nums.length; i++) {
          stack.push(nums[i])
          backtracking(stack, i + 1);
          stack.pop()
      }
  }
  backtracking([], 0)
  return result;
};