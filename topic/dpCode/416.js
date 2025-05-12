/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {


    let total = nums.reduce((cur, val) => cur + val, 0)


    if (total % 2 > 0) {
        return false
    }

    total = total / 2

    console.log(total)

    const dp = Array.from({ length: nums.length }, () => new Array(total + 1).fill(0))

    for (let i = 0; i < nums.length; i++) {
        dp[0][i] = 0
    }

    for (let i = 1; i <= total; i++) {
        if (i >= nums[0]) {
            dp[0][i] = nums[0]
        } else {
            dp[0][i] = 0
        }
    }

    for (let i = 1; i < nums.length; i++) {

        const val = nums[i]
        for (let j = 1; j <= total; j++) {
            if (j - val < 0) {
                dp[i][j] = dp[i - 1][j]

            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - val] + val)
            }
        }
    }

    console.log(dp)


    for (let i = 0; i < nums.length; i++) {
        if (dp[i][total] === total) {
            return true
        }
    }

    return false

};

console.log(
    canPartition([14, 9, 8, 4, 3, 2])
)