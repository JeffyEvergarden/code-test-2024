/**
 * @param {number[]} nums
 * @return {number}
 */

var removeDuplicates = function (nums) {
    if (nums.length === 0) {
        return 0
    }
    let len = nums.length
    let i = 0
    let k = 0
    let num = 0
    let target = nums[0]
    while (i < nums.length) {
        console.log(i, nums[i], target)
        if (nums[i] === target) {
            num++
            if (num <= 2) {
                nums[k] = nums[i]
                k++
            }
        } else {
            target = nums[i];
            nums[k] = nums[i];
            k++
            num = 1
        }
        i++
    }
    nums.length = k
    return k
};

console.log(
    removeDuplicates(
        [1, 1, 1, 2, 2, 3]
    )
)