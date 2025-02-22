/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {

  let result = []
  let stack = []
  const used = []
  function hasOne(end, target) {
    for (let i = 0; i <= end; i++) {
      if (target === nums[i] && used[i] === 0) {
        return true
      }
    }
    return false
  }


  function backtracking(stack, start) {

    if (stack.length > 1) {
      result.push([...stack])
    }

    // 7、5、4、3、3、4、7
    for (let i = start; i < nums.length; i++) {
      const len = stack.length

      let k = i - 1
      // 跳过重复元素
      while (k > -1) {
        if (nums[k] === nums[i]) {
          break
        }
        k--
      }
      // 第一个元素有重复元素
      if (used.length === 0 && k > -1) {
        continue
      }
      // 有重复元素
      if (used.length > 0 && k > used[used.length - 1]) {
        continue
      }

      // 当前层重复元素
      if (len === 0 || len > 0 && stack[len - 1] <= nums[i]) {
        stack.push(nums[i])
        used.push(i)
        backtracking(stack, i + 1)
        stack.pop()
        used.pop()
      }
    }
  }

  backtracking([], 0)
  return result;
};

console.log(
  findSubsequences(
    [1, 1, 2, 2, 3, 3]
  )
)