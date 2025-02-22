/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let result = []

  function brackTracking(stack, total, index) {
    if (stack.length === k && total === n) {
      result.push([...stack])
    }
    if (total > n) {
      return
    }

    for (let i = index; i <= 9; i++) {
      stack.push(i)
      brackTracking(stack, total + i, i + 1)
      stack.pop()
    }

  }
  brackTracking([], 0, 1)

  return result
};

console.log(
  combinationSum3(3, 12)
)