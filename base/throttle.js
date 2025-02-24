
// 节流
function throttle(fn, time) {
    let flag = false
    return (...args) => {
        if (flag) {
            return false
        }
        fn(...args)
        flag = true
        setTimeout(() => {
            flag = false
        }, time * 1000)
    }
}

// 防抖
function debounce(fn, time) {

    let timer = null

    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, time * 1000)
    }
}