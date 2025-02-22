/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b)
  let result = []
  const len = nums.length
  function backtracking(stack, start) {
      if (start > nums.length) {
          return
      }
      result.push([...stack])
      let origin = start
      for (let i = start; i < nums.length; i++) {
          if (i > start && nums[i] === nums[i - 1]) {
              continue
          }
          stack.push(nums[i])
          backtracking(stack, i + 1);
          stack.pop()
      }
  }
  backtracking([], 0)
  return result;
};