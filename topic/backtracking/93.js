/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const result = [];

  function isFormateNumber(num) {
    if (num[0] === '0' && num.length > 1) {
      return false
    }
    num = Number(num);

    if (num >= 0 && num <= 255) {
      return true
    }
    return false
  }

  function backtracking(stack, startIndex) {


    if (startIndex > s.length || stack.length > 4) {
      return
    }
    if (startIndex === s.length && stack.length === 4) {
      result.push(stack.join('.'))
    }
    const osi = startIndex
    for (let i = startIndex; i < startIndex + 3; i++) {
      const nextStr = s.substring(osi, i + 1)
      if (!isFormateNumber(nextStr)) {
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
console.log(
  restoreIpAddresses('25525511135')
)