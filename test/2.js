
function heapSort(arr) {

    let len = arr.length;
    // 4 - 0 -1 -2 - 3

    for (let i = Math.floor((len - 1) / 2) - 1); i >= 0; i--) {
        heapify(arr, len, i)
    }


    for (let i = len - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]
        heapify(arr, i - 1, 0)
    }

    return arr
}


function heapify(arr, n, i) {

    let max = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    if (left < n && arr[max] <= arr[left]) {
        max = left;
    }

    if (right < n && arr[max] <= arr[right]) {
        max = right
    }

    if (max !== i) {
        [arr[max], arr[i]] = [arr[i], arr[max]]
        heapify(arr, n, max)
    }

}