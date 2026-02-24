/**
 * rcedit 编程式调用示例
 * 在代码中直接修改 exe 的版本信息、图标、UAC 等级等
 */
import { rcedit } from 'rcedit'
import { resolve } from 'path'

const exePath = resolve(process.cwd(), 'your-app.exe') // 改成你的 exe 路径

const options = {
  'file-version': '1.0.0',
  'product-version': '1.0.0',
  'version-string': {
    CompanyName: 'Your Company',
    FileDescription: 'Your app description',
    ProductName: 'Your Product Name',
    LegalCopyright: 'Copyright © 2024',
    OriginalFilename: 'your-app.exe',
  },
  // icon: resolve(process.cwd(), 'app.ico'),
  // 'requested-execution-level': 'asInvoker', // asInvoker | highestAvailable | requireAdministrator
  // 'application-manifest': resolve(process.cwd(), 'app.manifest'),
}

async function main() {
  try {
    await rcedit(exePath, options)
    console.log('rcedit 执行成功')
  } catch (err) {
    console.error(err)
  }
}

main()
