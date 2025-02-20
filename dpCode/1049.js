/**1049. 最后一块石头的重量 II
 * @param {number[]} nums
 * @return {boolean}
 */
var lastStoneWeightII  = function (nums) {


    let max = nums.reduce((cur, val) => cur + val, 0)


    total = Math.floor(max / 2)



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


    const extra = max - dp[nums.length -1][total]


    return extra - dp[nums.length -1][total]

};

console.log(
    lastStoneWeightII([2,7,4,1,8,1])
)