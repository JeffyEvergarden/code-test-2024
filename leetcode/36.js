/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const rowColumn = Array.from({ length: 9 }, () => new Array(10).fill(0))
    const columnColumn = Array.from({ length: 9 }, () => new Array(10).fill(0))
    const niceBoard = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => new Array(10).fill(0)))

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let val = board[i][j]
            if (val === '.') {
                continue
            }
            rowColumn[i][val]++
            columnColumn[j][val]++

            let m = Math.floor(i / 3)
            let n = Math.floor(j / 3)

            niceBoard[m][n][val]++

            if (rowColumn[i][val] > 1 || columnColumn[j][val] > 1 || niceBoard[m][n][val] > 1) {
                return false
            }
        }
    }

    return true
};


const a1 = [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]


console.log(isValidSudoku(a1))
