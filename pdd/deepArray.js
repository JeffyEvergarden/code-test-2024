function deepArray(arr) {
    let k = 1
    function deep(arr, i) {

        if (i > k) {
            k = i
        }

        arr.forEach(ele => {
            Array.isArray(element) && deep(ele, i + 1)
        });

    }

    return k
}
