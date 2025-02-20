/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    const arr = new Array(n).fill(0).map((val, index) => index + 1)
    const used = new Array(n).fill(0)
    let result = []
    let count = 0
    function backTracking(stack) {

        if (count > k || stack.length > arr.length) {
            return
        }

        if (stack.length === arr.length) {
            result.push(stack.join(''))
            count++
            return
        }



        for (let i = 0; i < arr.length; i++) {
            if (used[i] === 1) {
                continue
            }
            stack.push(arr[i])
            used[i] = 1
            backTracking(stack)
            stack.pop()
            used[i] = 0

        }
    }
    backTracking([])

    return result[k - 1] || ''

};