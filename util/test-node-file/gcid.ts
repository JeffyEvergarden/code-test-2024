/**
 * 文件 GCID 计算模块
 *
 * GCID（Global Content ID）是一种基于内容寻址的标识符：
 * 将文件按块切分 → 每块计算 SHA1 得到块哈希(BCID) → 对所有块哈希再做一次 SHA1 得到 GCID。
 * 相同内容的文件会得到相同的 GCID，常用于去重、校验、P2P 等场景。
 *
 * @auth 赖传峰
 * @date 2026/2/28
 */

import { createHash } from 'crypto'
import { createReadStream, statSync } from 'fs'
import { Readable } from 'stream'

/**
 * ---------------------------------------------------------------------------
 * 本文件用到的 crypto 相关 API 用法说明（Node.js 内置模块）
 * ---------------------------------------------------------------------------
 *
 * 1. createHash(algorithm: string): Hash
 *    - 来源：crypto.createHash
 *    - 作用：创建一个可增量更新的哈希计算器
 *    - 参数：algorithm 常用 'sha1' | 'sha256' | 'md5' 等
 *    - 返回：Hash 实例，可多次 update 后一次 digest
 *
 * 2. hash.update(data: BinaryLike, encoding?: Encoding): Hash
 *    - 作用：往当前哈希状态里追加一段数据（可多次调用，等价于把多段数据拼在一起再算哈希）
 *    - 参数：data 可为 string | Buffer | ArrayBuffer 等；encoding 在 data 为 string 时指定编码（如 'utf8'）
 *    - 返回：this，支持链式调用
 *
 * 3. hash.digest(encoding?: Encoding): Buffer | string
 *    - 作用：结束计算并输出最终哈希值；调用后该 Hash 实例不可再 update，需重新 createHash 才能再算
 *    - 参数：不传或传 'binary' 返回 Buffer；传 'hex' 返回十六进制字符串；'base64' 等也可
 *    - 本文件中：bcidHash.digest() 得到 Buffer 供 gcidHash.update；gcidHash.digest('hex') 得到 GCID 字符串
 *
 * 本文件中的用法对应关系：
 *   - createHash('sha1')     → 创建 SHA1 哈希对象（块哈希 / 顶层 GCID 哈希）
 *   - bcidHash.update(chunk) → 把当前文件块数据喂给块哈希
 *   - bcidHash.digest()      → 得到该块的 20 字节 SHA1（Buffer），再作为 gcidHash 的输入
 *   - gcidHash.update(blockHash) → 把块哈希当作“下一段数据”参与顶层 SHA1
 *   - gcidHash.digest('hex') → 得到最终 GCID 的十六进制字符串
 * ---------------------------------------------------------------------------
 */

/** 计算结果的类型：文件大小（字节）和 GCID 十六进制字符串 */
interface GCIDResult {
    size: number
    gcid: string
}

/**
 * 根据文件大小计算分块大小（字节）
 *
 * 逻辑：文件越大，块越大，以减少块数量和最终哈希计算量，同时保证小文件有足够粒度。
 * 阶梯规则：
 *   - 文件 ≤ 128MB  → 块大小 256KB
 *   - 文件 ≤ 256MB  → 块大小 512KB
 *   - 文件 ≤ 512MB  → 块大小 1MB
 *   - 文件 ≤ 1GB    → 块大小 2MB
 *   - 文件 > 1GB    → 块大小 4MB
 */
function calcBlockSize(fileSize: number): number {
    const KB: number = 1024
    const MB: number = 1024 * KB

    if (fileSize <= 128 * MB) return 256 * KB // 256KB
    if (fileSize <= 256 * MB) return 512 * KB // 512KB
    if (fileSize <= 512 * MB) return 1024 * KB // 1MB
    if (fileSize <= 1024 * MB) return 2048 * KB // 2MB
    return 4096 * KB // 4MB
}

/**
 * 计算指定路径文件的 GCID（及文件大小）
 *
 * 流程简述：
 * 1. 同步获取文件大小，据此得到块大小 blockSize
 * 2. 用 blockSize 作为 highWaterMark 创建可读流，按块读取文件
 * 3. 每读入一块：先对该块做 SHA1 得到 blockHash（即 BCID），再把 blockHash 写入 gcidHash
 * 4. 流结束时对 gcidHash 做一次 digest，得到 GCID = SHA1(blockHash1 || blockHash2 || ...)
 * 5. 返回 { size, gcid }，gcid 为十六进制大写字符串
 *
 * @param filepath 文件绝对或相对路径
 * @returns Promise<{ size, gcid }>
 */
export default async (filepath: string): Promise<GCIDResult> =>
    new Promise((resolve, reject) => {
        try {
            // 同步获取文件信息，用于得到文件大小并参与块大小计算
            const stats = statSync(filepath)
            const fileSize: number = stats.size

            // 根据文件大小计算块大小
            const blockSize: number = calcBlockSize(fileSize)

            // 用于累积“所有块哈希”的 SHA1，最终 digest 即为 GCID
            const gcidHash = createHash('sha1')

            // 以 blockSize 为 highWaterMark，使每次 'data' 收到的 chunk 大小接近 blockSize，便于按块哈希
            const fileStream: Readable = createReadStream(filepath, { highWaterMark: blockSize })

            fileStream.on('data', (chunk: Buffer) => {
                // 当前块的 SHA1，即该块的 BCID（Block Content ID）
                const bcidHash = createHash('sha1')
                bcidHash.update(chunk)
                const blockHash: Buffer = bcidHash.digest()

                // 将块哈希作为“下一段输入”更新到 GCID 的 SHA1 中，等价于 GCID = SHA1(所有块哈希按顺序拼接)
                gcidHash.update(blockHash)
            })

            fileStream.on('end', () => {
                const gcid: string = gcidHash.digest('hex').toUpperCase()
                resolve({ size: fileSize, gcid })
            })

            fileStream.on('error', (err: Error) => reject(err))
        } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)))
        }
    })
