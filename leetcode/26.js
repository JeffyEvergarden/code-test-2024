/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let k = 1
    let arr = nums
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            arr[k] = arr[i]
            k++
        }
    }
    nums.length = k

    return nums.length
};


console.log(
    removeDuplicates([1,1,2])
)