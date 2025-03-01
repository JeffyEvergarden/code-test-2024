/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const result = [];
    const path = [];
    const matrix = new Array(n).fill(0).map(() => new Array(n).fill("."));
    // 判断是否能相互攻击
    const canAttack = (matrix, row, col) => {
        let i;
        let j;
        // 判断正上方和正下方是否有皇后
        for (i = 0, j = col; i < n; i++) {
            if (matrix[i][j] === "Q") {
                return true;
            }
        }
        // 判断正左边和正右边是否有皇后
        for (i = row, j = 0; j < n; j++) {
            if (matrix[i][j] === "Q") {
                return true;
            }
        }
        // 判断左上方是否有皇后
        for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (matrix[i][j] === "Q") {
                return true;
            }
        }
        // 判断右上方是否有皇后
        for (i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (matrix[i][j] === "Q") {
                return true;
            }
        }
        return false;
    };


    const backtrack = (matrix, row) => {
        if (path.length >= n) {
            result.push([...path]);
            return;
        }

        if (row >= n) {
            return
        }


        for (let j = 0; j < n; j++) {
            // 当前位置会导致互相攻击 继续下一轮搜索
            if (canAttack(matrix, row, j)) {
                continue;
            }
            matrix[row][j] = "Q";
            path.push(matrix[row].join(""));
            // 另起一行搜索 同一行只能有一个皇后
            backtrack(matrix, row + 1);
            matrix[row][j] = ".";
            path.pop();
        }

    };
    backtrack(matrix, 0);
    return result;
};
