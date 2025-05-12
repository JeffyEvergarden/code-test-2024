/**
 * 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
 * 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
 * 请你计算并返回达到楼梯顶部的最低花费。
 * https://leetcode.cn/problems/min-cost-climbing-stairs/description/?envType=study-plan-v2&envId=dynamic-programming
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    let result = [0, 0]

    let lenggth

    for (let i = 2; i <= cost.length; i++) {
        result[i] = Math.min(result[i - 1] + cost[i - 1], result[i - 2] + cost[i - 2])
    }
    console.log(result);
    // 
    return result[cost.length]

};