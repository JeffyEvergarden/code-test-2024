#!/usr/bin/env node
/**
 * 使用 rcedit 修改 Windows 可执行文件资源的脚本
 * 文档: https://www.npmjs.com/package/rcedit
 *
 * 非 Windows 需安装 Wine: https://winehq.org
 * 使用: node edit-exe.js <exe路径> [选项]
 * 示例: node edit-exe.js ./app.exe --icon ./app.ico --file-version 1.0.0
 */

import { rcedit } from 'rcedit'
import { resolve } from 'path'

const args = process.argv.slice(2)
if (args.length === 0) {
  console.log(`
用法: node edit-exe.js <exe路径> [选项]

选项 (均可选):
  --icon <path>               .ico 图标路径
  --file-version <version>    文件版本，如 1.0.0
  --product-version <version>  产品版本
  --company-name <string>      公司名称 (version-string)
  --file-description <string>  文件描述 (version-string)
  --product-name <string>     产品名称 (version-string)
  --execution-level <level>    asInvoker | highestAvailable | requireAdministrator
  --manifest <path>           应用程序清单 .manifest 文件路径

示例:
  node edit-exe.js ./MyApp.exe --icon ./icon.ico --file-version 2.0.0 --product-name "My App"
`)
  process.exit(1)
}

const CLI_OPTION_MAP = {
  '--icon': (opts, val) => { opts['icon'] = resolve(val) },
  '--file-version': (opts, val) => { opts['file-version'] = val },
  '--product-version': (opts, val) => { opts['product-version'] = val },
  '--company-name': (opts, val) => {
    if (!opts['version-string']) opts['version-string'] = {}
    opts['version-string']['CompanyName'] = val
  },
  '--file-description': (opts, val) => {
    if (!opts['version-string']) opts['version-string'] = {}
    opts['version-string']['FileDescription'] = val
  },
  '--product-name': (opts, val) => {
    if (!opts['version-string']) opts['version-string'] = {}
    opts['version-string']['ProductName'] = val
  },
  '--execution-level': (opts, val) => {
    if (['asInvoker', 'highestAvailable', 'requireAdministrator'].includes(val)) {
      opts['requested-execution-level'] = val
    }
  },
  '--manifest': (opts, val) => { opts['application-manifest'] = resolve(val) },
}

function parseOptions(arr) {
  const opts = {}
  for (let i = 0; i < arr.length - 1; i++) {
    const key = arr[i]
    const val = arr[i + 1]
    const fn = CLI_OPTION_MAP[key]
    if (fn && typeof val === 'string' && !val.startsWith('--')) {
      fn(opts, val)
      i++
    }
  }
  return opts
}

const exePath = resolve(args[0])
const options = parseOptions(args.slice(1))

async function main() {
  try {
    console.log('目标:', exePath)
    console.log('选项:', JSON.stringify(options, null, 2))
    await rcedit(exePath, options)
    console.log('修改完成.')
  } catch (err) {
    console.error('rcedit 执行失败:', err.message)
    process.exit(1)
  }
}

main()
