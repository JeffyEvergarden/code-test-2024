/** 474. 一和零
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {

    const strsObj = strs.map(str => {
        let nums1 = 0
        let nums0 = 0
        let s = [...str]

        s.forEach((val) => {
            if (val === '1') {
                nums1++
            } else if (val === '0') {
                nums0++
            }
        })
        return {
            nums1,
            nums0
        }
    })

    // dp[i][j] = i个对象最大子集个数
    // 




};