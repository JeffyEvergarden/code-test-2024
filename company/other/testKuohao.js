
function vali(str) {
    const strs = str.split('')
    let stack = []
    let statusStack = []

    let i = 0
    while (i < strs.length) {
        const val = strs[i]
        if (['{', '[', '('].includes(val)) {
            let lastSVal = statusStack.length > 0 ? statusStack[statusStack.length - 1] : 0
            let curSVal = 1
            if (val === '{') {
                curSVal = 3
            } else if (val === '[') {
                curSVal = 2
            }
            if (lastSVal && curSVal > lastSVal) {
                return false
            }
            statusStack.push(curSVal)

            stack.push(val)
        } else {
            let curVal = stack.pop()
            curVal = curVal + val
            if (!(['{}', '[]', '()'].includes(curVal))) {
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
    vali('(([{}))')
)

console.log(
    vali('(({))')
)

console.log(
    vali('{(())}')
)