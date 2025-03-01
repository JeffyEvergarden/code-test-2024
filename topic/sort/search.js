// 必有的二分查找
function search(arr, target) {
  let i = 0;
  let j = arr.length - 1;
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (arr[i] === target) {
      return true
    } else if (target < arr[mid]) {
      j = mid - 1
    } else {
      i = mid + 1
    }
  }
  return false
}

// 0 - 1 -->0
