
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    let result = []
    let len = candidates.length

    candidates = candidates.sort((a, b) => a - b)
    const used = new Array(candidates.length).fill(0)

    function backtracking(stack, total, k) {

        if (total === target) {
            result.push([...stack])
            return
        }

        if (total > target || k > len) {
            return
        }


        for (let i = k; i < candidates.length; i++) {

            if (i > k && candidates[i] === candidates[i - 1]) {
                continue
            }

            stack.push(candidates[i])
            used[i] = 1
            backtracking(stack, total + candidates[i], i + 1)
            used[i] = 0
            stack.pop()
        }

    }
    backtracking([], 0, 0)

    return result
};

console.log(
    combinationSum2(
        [2, 5, 2, 1, 2]
        , 5)
)