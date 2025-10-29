Function.prototype._call = function (content) {
  const ob = content || globalThis
  ob.func = this
  const arg = Array.from(arguments).slice(1)
  let result = ob.func(...arg)
  delete ob.func
  return result
}

Function.prototype._apply = function (content, args) {
  const ob = content || globalThis
  ob.func = this
  var result = ob.func(...args)
  delete ob.func
  return result
}

Function.prototype._bind = function (content, ...args) {
  const ob = content || globalThis
  let fn = this

  return function (...arr) {
    ob._func = fn
    arr = [...args, ...arr]
    var result = ob.func(...arr)
    delete ob._func

    return result
  }
}

console.log(Array.prototype.slice._call([1, 2, 3, 4], 1), Array.prototype.slice.call([1, 2, 3, 4], 1))
