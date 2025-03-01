// 17. 电话号码的字母组合
// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (digits.length === 0) {
        return []
    }
    const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    Object.keys(map).forEach((key) => (map[key] = map[key].split('')))

    let result = []
    let len = digits.length



    function backtracking(stack, i) {
        if (i === len) {
            result.push(stack.join(''))
            return
        }

        const val = digits[i]
        const arr = map[val]
        arr.forEach((val) => {
            stack.push(val)
            backtracking(stack, i + 1)
            stack.pop()
        })
    }

    backtracking([], 0)

    return result
}