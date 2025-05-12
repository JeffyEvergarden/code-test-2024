/**1049. 最后一块石头的重量 II
 * @param {number[]} nums
 * @return {boolean}
 */
var findTargetSumWays = function (nums, target) {

    let len = nums.length

    let count = 0


    function next(i, total) {
        if (i > len) {
            return
        }

        if (i === len) {
            if (total === target) {
                count++
            }
            return
        }

        const cur = nums[i]

        next(i + 1, total + cur)
        next(i + 1, total - cur)
    }

    next(0, 0)

    return count
};

console.log(
    findTargetSumWays([1, 1, 1, 1, 1], 3)
)