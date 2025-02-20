/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    let result = []
    let len = candidates.length

    function backtracking(stack, total, k) {
        if (total > target || k >= len) {
            return
        }

        if (total === target) {
            result.push([...stack])
            return
        }


        for (let i = k; i < candidates.length; i++) {
            stack.push(candidates[i])
            backtracking(stack, total + candidates[i], i)
            stack.pop()
        }

    }
    backtracking([], 0, 0)

    return result
};