/**
 * 77. 组合
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let result = []
  const arr = new Array(n).fill(0).map((val, index) => index + 1)

  function backtracking(stack, index) {

    if (stack.length === k) {
      result.push([...stack])
      return
    }

    if (stack.length > k) {
      return
    }

    for (let i = index; i < arr.length; i++) {
      stack.push(arr[i])
      backtracking(stack, i + 1)
      stack.pop()
    }
  }
  backtracking([], 0)

  return result
};


console.log(
  combine(5, 3)
)