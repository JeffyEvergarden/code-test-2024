function quickStock(arr, left, right) {
  if (left >= right) {
    return
  }

  let midIndex = partion(arr, left, right)

  quickStock(arr, left, midIndex - 1)
  quickStock(arr, midIndex + 1, right)
}

function partion(arr, left, right) {
  let val = arr[right]

  let k = left

  for (let i = left; i <= right; i++) {
    if (arr[i] < val) {
      ;[arr[k], arr[i]] = [arr[i], arr[k]]
      k++
    }
  }
  ;[arr[k], arr[right]] = [arr[right], arr[k]]

  return k;
}


const testArr = [13,2,6,15,20,91,78]

quickStock(testArr, 0, testArr.length - 1)
console.log(testArr);