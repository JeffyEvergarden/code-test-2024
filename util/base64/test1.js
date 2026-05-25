// 直接 Base64 解码
const base64Str = 'ORMtFxhpZWUdBTMzPg0dQiUIKwJENmV4Wz8PER1ACw=='

// 方法1: 使用 atob
try {
  const decoded = atob(base64Str)
  console.log('直接解码:', decoded)
  console.log('解码长度:', decoded.length)
  console.log(
    '字符查看:',
    [...decoded].map(c => c.charCodeAt(0))
  )
} catch (e) {
  console.error('解码失败:', e.message)
}

// 方法2: 二进制查看
function base64ToBytes(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

const bytes = base64ToBytes(base64Str)
console.log('字节数组:', bytes)
console.log('十六进制:', [...bytes].map(b => b.toString(16).padStart(2, '0')).join(' '))
