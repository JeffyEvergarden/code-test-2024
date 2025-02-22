/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const strs = [...s]
  const len = strs.length;
  const result = [];

  function isBackString(i, j) {
    if (i > j) {
      return false
    }
    while (i <= j) {
      if (s[i] !== s[j]) {
        return false
      }
      i++;
      j--;
    }
    return true
  }

  function backtracking(stack, startIndex) {

    if (startIndex > s.length) {
      return
    }
    if (startIndex === s.length) {
      result.push([...stack])
    }
    const osi = startIndex
    for (let i = startIndex; i < s.length; i++) {
      const nextStr = s.substring(osi, i + 1)
      if (!isBackString(osi, i)) {
        continue
      }
      stack.push(nextStr);
      backtracking(stack, i + 1)
      stack.pop()
    }
  }

  backtracking([], 0);

  return result;

};

console.log(partition('aabaa'))