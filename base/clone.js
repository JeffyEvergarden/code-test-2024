function deepCopy(obj) {
    // Handle null, undefined, and non-object or array values
    if (obj === null || typeof obj !== 'object') return obj;

    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj);
    }

    // Handle Array
    if (Array.isArray(obj)) {
        const copy = [];
        for (let i = 0; i < obj.length; ++i) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    const copy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}


function deepClone2(obj) {

    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    if (obj instanceof Date) {
        return new Date(obj)
    }

    if (Array.isArray(obj)) {
        const arr = []
        for (let i = 0; i < obj.length; ++i) {
            arr[i] = deepClone2(obj[i]);
        }
        return arr
    }

    const copy = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { 
            copy[key] = deepClone2(obj[key])
        }
    }
    return copy
}