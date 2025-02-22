const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor((arr.length - 1) / 2)
  let leftList = arr.slice(0, mid + 1)
  let rightList = arr.slice(mid + 1)

  leftList = mergeSort(leftList)
  rightList = mergeSort(rightList)

  const newList = []

  let i = 0
  let j = 0

  while (i < leftList.length && j < rightList.length) {
    if (leftList[i] < rightList[j]) {
      newList.push(leftList[i])
      i++
    } else {
      newList.push(rightList[j])
      j++
    }
  }
  while (i < leftList.length) {
    newList.push(leftList[i])
    i++
  }

  while (j < rightList.length) {
    newList.push(rightList[j])
    j++
  }

  return newList
}

console.log(mergeSort([3, 4, 8, 5, 4, 7, 6, 5, 1, 2]))
