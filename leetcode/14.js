/**
 * https://leetcode.cn/problems/longest-common-prefix/
 * 14. 最长公共前缀
 * 
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let comStr = ''
  const len = strs[0].length
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== strs[0][i]) {
        return comStr
      }
    }
    comStr += strs[0][i]
  }

  return comStr
};