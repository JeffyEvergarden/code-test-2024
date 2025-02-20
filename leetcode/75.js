/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    let p = 0
    let q = nums.length - 1
    let i = 0
    function swap(a, b) {
        [nums[a], nums[b]] = [nums[b], nums[a]]
    }

    while (i < nums.length) {
        if (nums[i] === 0) {
            if (p <= i) {
                swap(p, i);
                p++
            }
            i++
        } else if (nums[i] === 2) {
            if (q > i) {
                swap(q, i);
                q--
            } else {
                i++
            }
        } else {
            i++
        }
        console.log(nums);
    }

    return nums
};

console.log(
    sortColors([0, 1, 2, 2, 1, 0])
)