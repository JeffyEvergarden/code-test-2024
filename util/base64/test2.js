// 直接 Base64 解码
const base64Str = 'ORMtFxhpZWUdBTMzPg0dQiUIKwJENmV4Wz8PER1ACw=='

// 1. 先 Base64 解码，然后尝试其他编码
const decoded = atob(base64Str);

// 尝试 UTF-8 解码
function tryUTF8Decode(bytes) {
  try {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (e) {
    return null;
  }
}

// 尝试 URL 解码
function tryURLDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return null;
  }
}

// 尝试从十六进制
function tryHexDecode(hexStr) {
  try {
    const bytes = new Uint8Array(hexStr.length / 2);
    for (let i = 0; i < hexStr.length; i += 2) {
      bytes[i / 2] = parseInt(hexStr.substr(i, 2), 16);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return null;
  }
}

// 完整尝试链
function tryAllDecodings(str) {
  const attempts = [];
  
  // 1. 直接作为字符串
  attempts.push({ method: '直接字符串', result: str });
  
  // 2. Base64 解码后的原始结果
  const base64Decoded = atob(str);
  attempts.push({ method: 'Base64解码', result: base64Decoded });
  
  // 3. 转字节数组查看
  const bytes = new TextEncoder().encode(base64Decoded);
  attempts.push({ method: '字节数组', result: bytes });
  
  // 4. 尝试不同编码
  const encodings = ['utf-8', 'utf-16le', 'utf-16be', 'latin1', 'ascii'];
  for (const encoding of encodings) {
    try {
      const decoder = new TextDecoder(encoding);
      const decoded = decoder.decode(bytes);
      if (decoded && decoded !== base64Decoded) {
        attempts.push({ method: `编码: ${encoding}`, result: decoded });
      }
    } catch (e) {}
  }
  
  // 5. 可能是压缩数据（gzip, deflate）
  // 注意：浏览器中解压缩需要特定API
  
  return attempts;
}

console.log("所有解码尝试:", tryAllDecodings(base64Str));