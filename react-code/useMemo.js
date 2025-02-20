const computedVal = useMemo(() => {
  return a + b
}, [a, b])

function useMemo(fn, arr) {
  let lastArr = []
  let lastResult

  return function memoized() {
    // 如果依赖为空, 则总是计算
    if (!arr || arr.length === 0) {
      lastResult = fn()
      return lastResult
    }

    const hasChanged = arr.some((val, index) => !Object.is(val, lastArr[index]))

    if (hasChanged) {
      lastResult = fn()
      lastArr = arr.slice(0)
    }

    return lastResult
  }
}


const computedVal = useMemo(() => {
  return a + b
}, [a, b])

function useMemo(fn, arr) {
  let lastResult;
  let lastArr = undefined;

  return function memoized() {
    if (!lastArr || arr.length === 0) {
      lastArr = arr
      lastResult = fn()
      return lastResult
    }

    let flag = arr.some((val, index) => { val !== lastArr[index] })

    if (flag) {
      lastArr = arr;
      lastResult = fn();
    }

    return lastResult
  }
}