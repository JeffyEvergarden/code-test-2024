/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {

  function isValidate(i, j) {
    if (j > s.length || i > s.length) {
      return 0
    }
    let sk = s.substring(i, j + 1)
    if (s[i] === '0') {
      return 0
    }
    if (Number(sk) > 0 && Number(sk) < 27) {
      return 1
    }
    return 0
  }
  //
  // dp[i] 单独以i为解码个数

  const dp = new Array(s.length).fill(0);
  dp[0] = isValidate(0, 0)
  dp[1] = dp[0] && isValidate(1, 1) + isValidate(0, 1)
  for (let i = 2; i < dp.length; i++) {
    console.log(isValidate(i - 1, i)&& dp[i - 2], isValidate(i, i) && dp[i - 1])
    dp[i] = (isValidate(i - 1, i) && dp[i - 2]) + (isValidate(i, i) && dp[i - 1])
  }
  return dp[dp.length - 1]
};



console.log(numDecodings('226'))
console.log(numDecodings('12')) // 2
console.log(numDecodings('06'))