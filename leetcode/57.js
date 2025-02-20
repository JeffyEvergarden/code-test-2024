/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    function compare(a, b) {
        return a[0] - b[0]
    }
    const arr = [...intervals]
    arr.push(newInterval)

    arr.sort((a, b) => compare(a, b))



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

'123'.SP