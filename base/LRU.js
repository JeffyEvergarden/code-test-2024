class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1; // 如果键不存在，返回 -1 表示未找到
        }

        // 获取值并将其移到最近使用的位置
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // 如果键已存在，先删除旧的键值对
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // 如果缓存已满，移除最近最少使用的项（即第一个插入的项）
            this.cache.delete(this.cache.keys().next().value);
        }

        // 插入新的键值对
        this.cache.set(key, value);
    }

    // 可选：打印当前缓存的内容，用于调试
    printCache() {
        console.log([...this.cache.entries()]);
    }
}