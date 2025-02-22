/**
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