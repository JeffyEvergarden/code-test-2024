// 节流 - 一段时间内只执行一次
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

// 防抖  一段时间内只执行最后一次
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

