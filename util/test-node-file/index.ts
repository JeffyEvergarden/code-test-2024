import systemRelated from './systemRelated'
import gcid from './gcid'
import fs from 'fs'

console.log(systemRelated.getDeviceId())

let systemRelatedNum = 0
let nodeGcidNum = 0

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

const readFileByNodeGcid = async (filePath: string) => {
    const [content, ms] = await measure('gcid (Node)', () => gcid(filePath))
    console.log(content)
    return { content, ms }
}

/** 比较两种方法的计算时间 */
const compareTime = async (path: string) => {
    console.log('\n--- 比较计算时间 ---')
    console.log('文件:', path)

    const fileSize = await fs.statSync(path).size

    const [res1, res2] = await Promise.all([
        readFileBySystemRelated(path).then((r) => ({ name: 'systemRelated', ...r })),
        readFileByNodeGcid(path).then((r) => ({ name: 'node gcid', ...r })),
    ])

    console.log('\n--- 汇总 ---', res1.content[0].gcid === res2.content.gcid)
    console.log(`systemRelated: ${res1.ms.toFixed(2)} ms`)
    console.log(`node gcid:     ${res2.ms.toFixed(2)} ms`)
    const diff = res1.ms - res2.ms
    const faster = diff > 0 ? 'node gcid' : 'systemRelated'
    if (diff > 0) {
        nodeGcidNum++
    } else {
        systemRelatedNum++
    }
    console.log(`较快: ${faster} (约 ${Math.abs(diff).toFixed(2)} ms)`)
}


const filePath = '/Users/jeffy/Documents/av-movie/1.mp4'
const filePath1 = '/Users/jeffy/Documents/av-movie/2.mp4'
const filePath2 = '/Users/jeffy/Documents/av-movie/3.mp4'
const filePath3 = '/Users/jeffy/Documents/av-movie/4.mp4'


// 执行比较
async function run() {
    await compareTime(filePath)
    await compareTime(filePath1)
    await compareTime(filePath2)
    await compareTime(filePath3)

    console.log('systemRelated 赢了', systemRelatedNum, '次')
    console.log('nodeGcidNum  赢了', nodeGcidNum, '次')
}

run()




