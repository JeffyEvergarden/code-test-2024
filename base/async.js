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


function requestQueue2(arr, max) {

    return new Promise((resolve, reject) => {

        let cur = 0
        let count = 0
        let countLimit = Math.min(arr.length, max)

        const reseult = []

        async function request() {
            count++

            if (cur >= max) {
                return;
            }

            if (count > countLimit) {
                return;
            }

            let index = cur;

            const task = arr[index];
            cur++

            try {
                const val = await task.run()
                result[index] = val
            } catch (err) {
                result[index] = error
            } finally {
                count--
                if (count >= arr.length) {
                    resolve(result)
                    return
                }
                request()
            }
        }


        for (let i = 0; i < max; i++) {
            request()
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

let arr = [genPromise(1), genPromise(2), genPromise(3), genPromise(4)]


requestQueue2(arr, 2)