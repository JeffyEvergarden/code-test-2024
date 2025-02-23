// 139. 单词拆分
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

/** 
 * https://leetcode.cn/problems/word-break/?envType=study-plan-v2&envId=dynamic-programming
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {

    const dp = new Array(s.length + 1).fill(false)

    s = '_' + s


    dp[0] = true


    // _abc
    // _abc
    for (let i = 1; i <= s.length; i++) {

        for (let j = 0; j < wordDict.length; j++) {
            const curWord = wordDict[j]
            const curWordLength = curWord.length

            const start = i - curWordLength + 1
            const end = i

            if (start > 0) {
                const str = s.substring(start, i + 1)
                // console.log(str)
                if (str === curWord && dp[start - 1]) {
                    dp[i] = true
                }
            }
        }
    }
    return dp[s.length - 1]
};

console.log(wordBreak('applepenapple', ['apple', 'pen']))