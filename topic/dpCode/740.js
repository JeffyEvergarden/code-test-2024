

/** 
740. 删除并获得点数
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
    const map = {}

    nums.forEach((val) => {

        if (map[val]) {
            map[val] = map[val] + val
        } else {
            map[val] = val
        }
    })

    const arr = Object.keys(map).map(item => Number(item)).sort((a, b) => a - b)

    const result = []
    result[0] = map[arr[0]]
    if (arr[1] - 1 === arr[0]) {
        result[1] = map[arr[0]] > map[arr[1]] ? map[arr[0]] : map[arr[1]]
    } else {
        result[1] = map[arr[0]] + map[arr[1]]
    }

    for (let i = 2; i < arr.length; i++) {

        const val = arr[i]

        const count = map[val]
        // [3, 4, 5]
        if (arr[i - 1] === arr[i] - 1) {
            result[i] = Math.max(count + result[i - 2], result[i - 1])
        } else {
            result[i] = result[i - 1] + count
        }

    }



    return result[arr.length - 1]

}

console.log(
    deleteAndEarn([3, 4, 5])
)