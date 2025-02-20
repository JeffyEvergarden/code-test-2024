const reducer = (a, b) => (...args) => a(b(...args))

Array.prototype._reduce = function (fn, val) {
  let initalVal = val

  let arr = this

  if (val === undefined) {
    arr = arr.slice(1)
    initalVal = arr[0]
  }

  arr.forEach((val) => {
    initalVal = fn(initalVal, val)
  })

  return initalVal
}

const compose = (...args) => {
  return args.reduce(reducer)
}
