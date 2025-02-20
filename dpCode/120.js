/**
 * https://leetcode.cn/problems/triangle/?envType=study-plan-v2&envId=dynamic-programming
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {

    let max = Infinity

    const deepLength = triangle.length

    const dp = new Array(deepLength)


    dp[0] = triangle[0][0]

    for (let i = 1; i < deepLength; i++) {
        for (let j = i; j >= 0; j--) {

            if (j === i) {
                dp[j] = dp[j - 1] + triangle[i][j]
            } else if (j > 0) {
                dp[j] = Math.min(dp[j], dp[j - 1]) + triangle[i][j]
            } else {
                dp[j] = dp[j] + triangle[i][j]
            }

        }
    }

    let min = Infinity

    for (let i = 0; i < deepLength; i++) {
        if (min > dp[i]) {
            min = dp[i]
        }

    }

    return min

};

console.log(
    minimumTotal(
        [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]
    )
)