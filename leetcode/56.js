/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {

    function compare(a, b) {
        return a[0] - b[0]
    }

    intervals.sort((a, b) => compare(a, b))
    let arr = intervals

    let i = 0;

    while (i < arr.length) {
        let len = arr.length
        if (i + 1 < len && arr[i][1] >= arr[i + 1][0]) {
            // 合并
            arr[i] = [arr[i][0], arr[i][1] >= arr[i + 1][1] ? arr[i][1] : arr[i + 1][1]]
            arr.splice(i + 1, 1)
        } else {
            i++
        }
    }

    return arr
};

console.log(
    merge([[1, 3], [2, 6], [8, 10], [15, 18]])
)