/** 343. 整数拆分
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化
 * https://leetcode.cn/problems/integer-break/
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  const dp = new Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 1;
  for (let i = 3; i < dp.length; i++) {
    let max = 0
    3 / 2 === 1
    for (let j = 1; j <= Math.ceil(i / 2); j++) {
      let val = Math.max(j * dp[i - j], j * (i - j))
      if (val > max) {
        max = val
      }
    }
    dp[i] = max
  }
  console.log(dp)
  return dp[n]
};

integerBreak(10)