/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  let len1 = s1.length;
  let len2 = s2.length;
  let len3 = s3.length;
  if (len1 + len2 !== len3) {
    return false
  }
  const dp = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(false))


  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = true
      } else if (i === 0) {
        dp[i][j] = s2[j - 1] === s3[j - 1]
      } else if (j === 0) {
        dp[i][j] = s1[i - 1] === s3[i - 1]
      } else {

        if (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) {
          dp[i][j] = true
        } else if (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]) {
          dp[i][j] = true
        } else {
          dp[i][j] = false
        }
      }
      // dp[i][j] =  // dp[i-1][j]  &&  s1[i-1] === s3[i+j-1]
      // dp[i][j-1]  &&  s2[j-1] === s3[i+j-1]
    }
  }
  console.log(dp);
  console.log('--------')
  return dp[len1][len2]
};

console.log(
  isInterleave('db', 'b', 'cbb')
)