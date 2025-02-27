class LRU {

    constructor(max) {
        this.cache = new Map()
        this.max = max
        this.size = 0
    }

    get(key) {
        if (!this.cache.get(key)) {
            return -1
        }

        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)
    }


    put(key, value) {
        // 如果没值
        if (!this.cache.get(key)) {
            if (this.size < this.max) {
                this.cache.set(key, value)
                this.size++
            } else {
                // 删除第一个值
                this.cache.delete(this.cache.keys().next().value);
                this.cache.set(key, value)
            }
        } else {
            // ------
            this.cache.delete(key)
            this.cache.set(key, value)
        }
    }

    printCache() {
        console.log([...this.cache.keys()])
        console.log([...this.cache.entries()]);
    }
}

const lru = new LRU(3)

lru.put(1, '01')
lru.put(2, '02')
lru.get(1)
lru.printCache()
lru.get(2)
lru.printCache()









