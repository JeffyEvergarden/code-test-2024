const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// 使用绝对路径确保能找到文件
const content = fs.readFileSync(path.join(__dirname, 'fake.js'), 'utf-8')

// 在 Node.js 中，Blob 需要从 'buffer' 模块导入
const { Blob } = require('buffer')

const blob = new Blob([content], { type: 'text/javascript' })

// 如何获取一个文件的一部分
const getPartFileU8 = async () =>
  new Promise(resolve => {
    console.log('blob.size:', blob.size)
    // 需要先获取 blob 的 ArrayBuffer，然后创建 Uint8Array
    blob.arrayBuffer().then(buffer => {
      const res = new Uint8Array(buffer)
      console.log('Uint8Array:', res.slice(0, 20))
      resolve(res.slice(0, 20))
    })
  })


const fn = async () => {  
  const u8 = await getPartFileU8()
  console.log('typeof u8:', typeof u8)
  
  // 在 Node.js 中使用 crypto.createHash 而不是 crypto.subtle
  const hash = crypto.createHash('sha1')
  hash.update(u8)
  const buffer = hash.digest()
  console.log('buffer:', buffer)
  console.log('hex:', buffer.toString('hex'))
}

fn()
