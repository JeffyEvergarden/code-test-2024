// 给你一个数组 nums: number[]，请你计算 nums[j] - nums[i] 能求得的 最大差值。并满足条件  0 <= i < j < nums.length  且 nums[i] < nums[j]。

// 如果不存在满足要求的 i 和 j ，返回 -1

// 测试用例

// input: [7,1,5,4] output: 4

// input: [9,4,3,2] output: -1

// input: [1,5,2,10] output: 9


function getMaxValu(nums) {

    let max = nums[1]
    let min = nums[0]
    let maxValue = nums[1] - nums[0]

    for (let i = 2; i < nums.length; i++) {
        min = Math.min(min, nums[i - 1]);
        maxValue = Math.max(nums[i] - min, maxValue)
    }

    return maxValue
}






console.log(
    getMaxValue([7, 1, 5, 4])
)


console.log(
    getMaxValue([9, 4, 3, 2])
)

console.log(
    getMaxValue([1, 5, 2, 10])
)