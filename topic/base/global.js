const url = 'www.mypikpak.com'

const url2 = 'localhost'

const url3 = 'mypikpak.com'

const url4 = 'mypikpak.net'

const url5 = 'dev-stg.mypikpak.net'

const url6 = 'dev.stg.mypikpak.net'

const URL_REG = /^(?:[-\w]+\.)?(\w+\.\w+)$/

const formate = severUrl => {
  if (severUrl && URL_REG.test(severUrl)) {
    severUrl = severUrl.replace(URL_REG, '$1')
  } else if (severUrl) {
    // 如果是SSG场景，会为localhost 或顶级域名，则使用 mypikpak.com
    severUrl = 'mypikpak.com'
  }
  return severUrl
}

console.log(formate(url))

console.log(formate(url2))

console.log(formate(url3))

console.log(formate(url4))

console.log(formate(url5))

console.log(formate(url6))

// --------------------------------
console.log(typeof self) // 客户端有
console.log(typeof globalThis) // 客户端有，服务端有
console.log(typeof global) // 服务端有
console.log(typeof window) // 客户端有