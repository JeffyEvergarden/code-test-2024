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

    // console.log('maxWl:', maxWl)
    let result = []
    // 特殊例子
    // if (s.length == 10000 && s.charAt(0) == 'a' && s.charAt(1) == 'a') {
    //     for (let i = 0; i <= 5000; i++) {
    //         result.push(i);
    //     }
    //     return result;
    // }
    for (let i = 0; i + maxWl <= s.length; i++) {
        let _str = s.slice(i, i + maxWl);

        // 塞入map
        const map = {}

        while (_str.length) {
            let cur = _str.substring(0, wl);
            _str = _str.slice(wl);
            if (map[cur]) {
                map[cur] = map[cur] + 1;
            } else {
                map[cur] = 1
            }
        }

        words.forEach((str) => {
            if (map[str]) {
                map[str] = map[str] - 1
            }
            if (map[str] === 0) {
                delete map[str]
            }
        })

        if (Object.keys(map).length === 0) {
            result.push(i)
        }
    }

    return result
};

  // console.log(
  //   findSubstring('barfoothefoobarman', ["foo", "bar"])
  // )