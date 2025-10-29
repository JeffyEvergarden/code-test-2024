const arr = [1, [2, 3], [[4, 5], 6, [7, [8, 9]]]]

function flat2(arr) {
  const _arr = arr.flat(Infinity)
  console.log(_arr);
  console.log(arr);
}


function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

function flatten(arr) {
  let result = []
  arr.forEach(val => {
    if (Array.isArray(val)) {
      result = result.concat(flatten(val))
    } else {
      result.push(val)
    }
  });

  return result
}
console.log(flatten(arr));
