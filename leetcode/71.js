/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {

    let stack = []

    let str = ''
    let i = 0
    while (i < path.length) {

        let cur = path[i]

        if (cur === '/') {
            if (str === '/..') {
                stack.pop()
                str = '/'
            } else if (str == '/.' || str === '' || str === '/') {
                str = '/'
            } else {

                stack.push(str)
                str = '/'
            }
        } else {
            str += cur
        }

        i++
    }
    console.log(str)

    if (i === path.length) {
        if (str === '/..') {
            stack.pop()
        } else if (str !== '/' && str !== '/.') {
            stack.push(str)
        }
    }


    return stack.join('') || '/'
};


console.log(simplifyPath('/a//b////c/d//././/..'))
