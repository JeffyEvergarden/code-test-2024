// 检查浏览器是否支持 serviceWorker
if ('serviceWorker' in navigator) {
  // 注册 serviceWorker
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('ServiceWorker 注册成功')
  })
}

// 以上代码首先检查当前执行环境是否支持 Service Worker API。如果是，则注册 /sw.js Service Worker。
// 可以在每次页面加载的时候，任意调用 register()－浏览器会检测 service worker 是否已经注册从而进行适当地处理。


// sw.js
// 监听 serviceWorker 的安装事件
self.addEventListener('install', event => {
  // 预缓存核心资源
  event.waitUntil(
    caches.open('v1').then(cache => {
      // 将指定的资源添加到缓存中
      return cache.addAll(['/', '/styles.css', '/app.js'])
    })
  )
})

// 监听 fetch 事件
self.addEventListener('fetch', event => {
  // 使用缓存优先策略处理请求
  event.respondWith(
    caches.match(event.request).then(response => {
      // 如果缓存中有匹配的请求则返回缓存，否则发起网络请求
      return response || fetch(event.request)
    })
  )
})

// 1、HTTPS 限制
// 生产环境必须使用 HTTPS（本地开发允许 localhost 或 127.0.0.1）。
