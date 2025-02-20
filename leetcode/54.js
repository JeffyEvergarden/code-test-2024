/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    const a = matrix;

    let rowLen = a.length;
    let columnLen = a[0].length;

    let result = []

    let i = 0;
    let j = 0

    let top = 0;

    let bottom = rowLen - 1;

    let left = 0;
    let right = columnLen - 1;


    while (left <= right && top <= bottom) {

        for (let j = left; j <= right; j++) {
            result.push(a[top][j])
        }
        top++;


        for (let i = top; i <= bottom; i++) {
            result.push(a[i][right])
        }
        right--;

        if (top > bottom) {
            break;
        }

        for (let j = right; j >= left; j--) {
            result.push(a[bottom][j])
        }
        bottom--;
        
        
        if (left > right) {
            break;
        }

        for (let i = bottom; i >= top; i--) {
            result.push(a[i][left])
        }
        left++;
    }

    return result;
}

console.log(
    spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
)