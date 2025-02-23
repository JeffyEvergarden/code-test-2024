/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {

  const value = strs.map((str) => {
    let a = 0;
    let b = 0;
    [...str].forEach((_char) => { _char === '0' && a++; _char === '1' && b++; })
    return {
      a, b
    }
  })

  const len = strs.length

  // dp[k][i][j] 0~k个物品上限 物品为i，j最大子集个数

  const dp = new Array(len).fill(0).map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)))

  for (let i = value[0].a; i <= m; i++) {
    for (let j = value[0].b; j <= n; j++) {
      dp[0][i][j] = 1
    }
  }

  // dp[k][i][j] 0~k个物品上限 物品为i，j最大子集个数
  // dp[k][i][j] = 放 dp[k][i-value[k].x][i-value[k].y] + 1
  // dp[k][i][j] = 不放 dp[k-1][i][j]

  // console.log(dp)

  for (let k = 1; k < value.length; k++) { // 数组
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i - value[k].a >= 0 && j - value[k].b >= 0) {
          dp[k][i][j] = Math.max(dp[k - 1][i - value[k].a][j - value[k].b] + 1,
            dp[k - 1][i][j])
        } else {
          // 放不下
          dp[k][i][j] = dp[k - 1][i][j]
        }
      }
    }
    // console.log(dp[k]);
  }
  return dp[len - 1][m][n]

};
// console.log(
//   findMaxForm(["10", "0001", "111001", "1", "0"], 3, 4)
// )
// "111001" , '0' ---> 3,4
