function heapSort(arr) {
  // 构建最大堆
  let n = arr.length

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i)
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    heapify(arr, i, 0)
  }
}

function heapify(arr, n, i) {
  let largest = i
  let left = 2 * i + 1
  let right = 2 * i + 2

  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== i) {
    ;[arr[largest], arr[i]] = [arr[i], arr[largest]]

    heapify(arr, n, largest)
  }
}

const testArr = [13, 2, 6, 15, 20, 91, 78]

heapSort(testArr)
console.log(testArr)
