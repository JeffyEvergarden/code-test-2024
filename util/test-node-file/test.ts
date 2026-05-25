import systemRelated from './systemRelated'

const formatSize = (size: number) => {
    if (size < 1024) {
        return size + 'B'
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB'
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'MB'
    } else if (size < 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
    } else if (size < 1024 * 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'TB'
    } else {
        return (size / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'PB'
    }
}

/** 计时并执行异步函数，返回 [ 结果, 耗时毫秒 ] */
const measure = async <T>(label: string, fn: () => Promise<T>): Promise<[T, number]> => {
    const start = performance.now()
    const result = await fn()
    const ms = performance.now() - start
    console.log(`[${label}] 耗时: ${ms.toFixed(2)} ms`)
    return [result, ms]
}

const readFileBySystemRelated = async (filePath: string) => {
    const [content, ms] = await measure('systemRelated.calculateGCIDBatch', () =>
        Promise.resolve(systemRelated.calculateGCIDBatch([filePath]))
    )
    console.log(content)
    return { content, ms }
}

readFileBySystemRelated('/Users/jeffy/Downloads/广州期货交易所.zip')