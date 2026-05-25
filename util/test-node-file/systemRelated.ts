/**
 * @auth 赖传峰
 * @date 2026/1/5
 */
import path from 'node:path'


interface SystemRelated {
  /**
   * 获取设备的 32 位 UID
   */
  getDeviceId(): string

  /**
   * 批量计算文件的 GCID，返回值顺序与入参顺序保持一致
   * @param multiFilepath
   * @return {
   *   size: -1 时表示错误，错误信息展示在 gcid 字段
   *   gcid: size == -1 时显示错误信息
   *   path: 传入的文件地址
   * }
   */
  calculateGCIDBatch(multiFilepath: string[]): { size: number; gcid: string; path: string }[]
}

console.log(path.join(__dirname, `./node-addon/${process.arch}/system-related.node`))

const addon: SystemRelated = require(
  path.join(__dirname, `./node-addon/${process.arch}/system-related.node`),
)
export default addon
