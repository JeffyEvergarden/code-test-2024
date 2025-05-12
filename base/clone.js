const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
  if (obj instanceof Map) return new Map([...obj].map(([key, value]) => [deepClone(key), deepClone(value)]))
  if (obj instanceof Set) return new Set([...obj].map(value => deepClone(value)))
  if (obj instanceof ArrayBuffer) return obj.slice(0)
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (obj instanceof Object) {
    const copy = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key])
      }
    }
    return copy
  }
  return obj
}

function deepCopy(obj) {
  // Handle null, undefined, and non-object or array values
  if (obj === null || typeof obj !== 'object') return obj

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj)
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const copy = []
    for (let i = 0; i < obj.length; ++i) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  }

  // Handle Object
  const copy = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key])
    }
  }
  return copy
}

export { deepClone, deepCopy }
