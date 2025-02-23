/**
 * 279. 完全平方数 完全平方数 https://leetcode.cn/problems/perfect-squares/description/
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
* 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  let x = Math.floor(Math.sqrt(n));
  let pack = []
  while (x >= 1) {
    pack.push(x * x);
    x--
  }
  console.log(pack);
  const dp = new Array(n + 1).fill(0);
  // 物品 pack
  // 容量为n
  // 求最小个数
  // dp[j] = Math.min(dp[j-pack[i]]+1)
  for (let j = 1; j <= n; j++) {
    dp[j] = Infinity
    for (let i = 0; i < pack.length; i++) {
      if (j >= pack[i]) {
        dp[j] = Math.min(dp[j - pack[i]] + 1, dp[j])
      }
    }
  }

  return dp[n];
};


console.log(
  numSquares(13)
)