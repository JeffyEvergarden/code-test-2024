/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let i = 0;
  let j = m - 1
  while (i < j) {
    let mid = Math.floor((i + j) / 2);
    if (matrix[mid][0] === target) {
      return true;
    } else if (target < matrix[mid][0]) {
      j = mid - 1
    } else {
      if(matrix[mid][n - 1] >= target) {// 就在这行
        i = mid;
        break;
      } else {
        i = mid + 1;
      }
    }
  }

  let row = i;
  i = 0;
  j = n - 1;
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (matrix[row][mid] === target) {
      return true;
    } else if (matrix[row][mid] < target) {
      i = mid + 1;
    } else {
      j = mid - 1;
    }
  }
  return false
};