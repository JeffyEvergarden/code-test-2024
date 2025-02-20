const lodashGet = (obj, link) => {

    const links = link.split('.')

    const reg = /(\w+)?\[(\d+)\]/

    console.log(links)

    let result = obj

    for (let key of links) {
        if (reg.test(key)) {
            const match = key.match(reg)
            result = result[match[2]]
        } else {
            result = result[key]
        }
        console.log(result)
    }

    return result
}


const testObj = [{
    a: {
        b: 10
    }
}]

console.log(
    lodashGet(testObj, 'testObj[0].a.b')
)