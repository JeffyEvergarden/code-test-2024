const asyncPromise = (n) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(n)
            resolve(n)
        }, 1000)
    })
}


function asyncTime(n) {

    let num = 0

    function dispatch(i) {

        if (i > n) {
            return Promise.resolve(num)
        }
        return asyncPromise(i).then((val) => {
            num = num + val
            return dispatch(i + 1)
        })
    }

    return dispatch(1)
}

asyncTime(3).then(res => console.log(res))