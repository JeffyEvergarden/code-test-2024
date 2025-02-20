/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums = nums.sort((a, b) => a - b)
    console.log(nums)
    let result = []
    for (let k = 0; k < nums.length - 3; k++) {

        if (k > 0 && nums[k] === nums[k - 1]) {
            continue
        }

        for (let m = k + 1; m < nums.length - 2; m++) {

            if (m > k + 1 && nums[m] === nums[m - 1]) {
                continue
            }
            let i = m + 1
            let j = nums.length - 1
            while (i < j) {
                let total = nums[k] + nums[m] + nums[i] + nums[j]
                if (total === target) {
                    result.push([nums[k], nums[m], nums[i], nums[j]])
                    let iv = nums[i]
                    let jv = nums[j]
                    i++
                    while (nums[i] === iv) {
                        i++
                    }
                    j--
                    while (nums[j] === jv) {
                        j--
                    }
                } else if (total - target > 0) {
                    j--
                } else {
                    i++
                }
            }


        }
    }
    return result
};


console.log(
    fourSum([-1, 0, 1, 2, -1, -4], -1)
)