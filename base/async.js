function requestQueue(arr, max) {

    return new Promise((resolve, reject) => {

        let count = 0

        let result = []

        let curIndex = 0

        function request() {
            let url = arr[curIndex]

            if (curIndex >= arr.length) {
                return
            }

            try {
                result[curIndex] = await fetch(url)

            } catch (err) {

                result[curIndex] = err;
            } finally {
                count++;
                if (count >= arr.length) {
                    resolve(result)
                }

                request();
            }
        }

        let time = Math.min(max, arr.length)


        for (let i = 0; i < time; i++) {
            request();
        }
    })

}

const genPromise(i) {
    return () => new Promise(resolve => {
        setTimeout(() => {
            resolve(i)
        }, 1000)
    })
}


function requestQueue3(arr, max) {

    return new Promise((resolve, reject) => {

        max = Math.min(max, arr.length);

        let cur = 0
        let count = 0 // 当前执行任务数
        let result = []

        async function request() {

            if (count > max) {
                return;
            }
            if (cur > arr.length) {
                return;
            }
            let index = cur;
            let task = arr[cur]
            cur++
            try {
                let res = await task()
                result[index] = res
            } catch (e) {
                result[index]] = e
            } finally {
                count--;
                if (result.length === arr.length) {
                    resolve(result)
                }
                request()
            }
        }
    })
}



let arr = [genPromise(1), genPromise(2), genPromise(3), genPromise(4)]


requestQueue(arr, 2)