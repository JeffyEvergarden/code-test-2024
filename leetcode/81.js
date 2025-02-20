/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    // 找数
    if (nums.length === 0) {
        return false
    }
    let a = nums
    let i = 0
    let j = nums.length - 1

    while (i <= j) {
        // console.log(i, j)
        let mid = parseInt((i + j) / 2)

        if (target === a[mid]) {
            return true
            // 正好单调区间
        } else if (target < a[mid] && target >= a[i]) {
            j = mid - 1
        } else if (target < a[mid] && target < a[i]) {
            i++
        } else if (target > a[mid] && target <= a[j]) {
            i = mid + 1
        } else if (target > a[mid] && target > a[j]) {
            j--
        } else {
            console.log('死循环')
            console.log(i, j)
            break
        }
    }

    return false
};
