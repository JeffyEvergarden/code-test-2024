/**
 * https://leetcode.cn/problems/substring-with-concatenation-of-all-words/
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {


    const len = words.length
    const wl = words[0].length
    const maxWl = wl * len

    let result = []
    const originMap = {}
    words.forEach((str) => {
        if (originMap[str]) {
            originMap[str] = originMap[str] + 1
        } else {
            originMap[str] = 1
        }
    })


    function isValidate(str) {
        if (str.length !== maxWl) {
            return false
        }
        const map = Object.assign({}, originMap)
        for (let i = 0; i + wl <= maxWl; i = i + wl) {
            const cur = str.slice(i, i + wl)
            if (map[cur]) {
                map[cur] = map[cur] - 1
            } else {
                return false
            }
            if (map[cur] === 0) {
                delete map[cur]
            }
        }

        return Object.keys(map).length === 0
    }


    for (let i = 0; i + maxWl <= s.length; i++) {
        let _str = s.slice(i, i + maxWl);

        if (isValidate(_str)) {
            result.push(i)
        }
    }

    return result
};

// console.log(
//   findSubstring('barfoothefoobarman', ["foo", "bar"])
// )