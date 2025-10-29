/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {

  // 胃口
  g.sort((a, b) => b - a);
  // 饼干
  s.sort((a, b) => b - a);

  let count = 0
  let i = 0;
  let j = 0
  while (i < s.length && j < g.length) {
    if (s[i] >= g[j]) {
      count++
      i++
      j++
    } else {
      j++
    }
  }

  return count
};