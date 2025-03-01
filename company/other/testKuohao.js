const map = new Map([['(', 1], ['[', 2], ['{', 3]])

function isVali(s) {
    const stack = []
    const statusStack = []
    let len = s.length
    let i = 0
    while (i < len) {
        const cur = s[i]
        if (['{', '[', '('].includes(cur)) {
            stack.push(cur)
            const val = map.get(cur)
            if (statusStack.length > 0) {
                lastVal = statusStack[statusStack.length - 1]
                if (val > lastVal) {
                    return false
                }
            }
            statusStack.push(val)

        } else {
            if (stack.length === 0) {
                return false
            }
            const val = stack.pop()
            if (!(['{}', '[]', '()'].includes(val + cur))) {
                return false
            } else {
                statusStack.pop()
            }
        }
        i++
    }
    return stack.length === 0
}

console.log(
    isVali('([{}])')
)

console.log(
    isVali('(({))')
)

console.log(
    isVali('{(())}')
)

console.log(
    isVali('{()[()]}')
)