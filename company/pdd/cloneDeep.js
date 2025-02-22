function cloneDeep(obj, map = new Map()) {

    // 解决null
    if (!obj || typeof obj !== 'object') {
        return obj
    }

    // 解决数组嵌套
    if (map.has(obj)) {
        return map.get(obj)
    }

    let newObj = {}
    
    if (Array.isArray(obj)) {
        newObj = []
    }


    for (let key in Obj) {
        newOb[key] = cloneDeep(obj[key], map)
    }

    return newObj

}