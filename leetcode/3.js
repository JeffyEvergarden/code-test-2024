// 无重复字符的最长子串
// 提示
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串的长度。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let strArr = [...s]
  let map = {}
  let target = 0
  let _start = 0

  for (let i = 0; i < strArr.length; i++) {
    let char = strArr[i] // 当前字符
    

    // 如果没有记录位
    if (!map[char] && map[char] !== 0) {
        map[char] = i // 记录该字符位置
        // 更新记录位
        if(i - _start +1 > target) {
            target = i - _start +1
        }
    } else if (_start > map[char]) {
        map[char] = i // 更新该字符位置
        target = i - _start + 1
    } else {
        map[char] = i
        _start =  map[char] +1;
        map[char] = i;
    }
  }
  return target
}
