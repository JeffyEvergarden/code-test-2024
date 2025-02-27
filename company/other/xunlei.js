



const getMaxValue = (arr) => {

    let min = arr[0]

    let maxValue = -Infinity

    for (let i = 1; i < arr.length; i++) {
        const cur = arr[i]
        if (cur - min > maxValue) {
            maxValue = cur - min
        }
        if (cur < min) {
            min = cur
        }
    }

    return maxValue > 0 ? maxValue : -1
}


console.log(
    getMaxValue([7, 1, 5, 4])
)


console.log(
    getMaxValue([9, 4, 3, 2])
)

console.log(
    getMaxValue([1, 5, 2, 10])
)