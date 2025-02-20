var generateParenthesis = function (n) {
    let result = []

    function backTracking(stack, left, right) {
        if (left < 0 || right < 0) {
            return
        }
        if (left === 0 && right === 0) {
            result.push(stack.join(''))
            return
        }

        if (left === right) {
            stack.push('(')
            backTracking(stack, left - 1, right)
            stack.pop()
        } else if (left < right) {
            stack.push('(')
            backTracking(stack, left - 1, right)
            stack.pop()

            stack.push(')')
            backTracking(stack, left, right - 1)
            stack.pop()
        }


    }
    backTracking([], n, n)
    return result
}