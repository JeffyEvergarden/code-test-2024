/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    let a = matrix;
    let rl = a.length
    let cl = a[0].length

    // 先对角线翻转
    for (let i = 0; i < rl; i++) {
        for (let j = 0; j < i; j++) {
            [a[i][j], a[j][i]] = [a[j][i], a[i][j]]
        }
    }

    // 再左右翻转
    for (let i = 0; i < rl; i++) {
        for (let j = 0; j < cl / 2; j++) {
            [a[i][j], a[i][cl - j - 1]] = [a[i][cl - j - 1], a[i][j]]
        }
    }


    return a
};


var rotate2 = function (matrix) {
    let a = matrix;
    let rl = a.length
    let cl = a[0].length

    // 先对角线翻转
    for (let i = 0; i < (rl - 1) / 2; i++) {
        for (let j = 0; j < cl / 2; j++) {
            let tmp = a[i][j]
            a[i][j] = a[cl - j - 1][i]
            a[cl - j - 1][i] = a[rl - i - 1][cl - j - 1]
            a[rl - i - 1][cl - j - 1] = a[j][rl - i - 1]
            a[j][rl - i - 1] = tmp

        }
    }


    return a
};

console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
console.log(rotate2([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))