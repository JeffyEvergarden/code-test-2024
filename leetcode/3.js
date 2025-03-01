/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (!s) {
    return 0
  }

  const map = {}
  let start = 0
  let curLen = 0
  let maxLen = 0
  for (let i = 0; i < s.length; i++) {
    const val = s[i]
    if (isNaN(map[val])) {
      curLen++
    } else {
      const lastStart = map[val]
      if (lastStart >= start) {
        start = lastStart + 1
        curLen = i - lastStart
      } else {
        curLen++
      }
    }
    map[val] = i
    if (curLen > maxLen) {
      maxLen = curLen
    }

  }


  return maxLen
};

console.log(
  lengthOfLongestSubstring(
    "abcabcbb"
  )
)