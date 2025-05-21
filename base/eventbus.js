class EventBus {
  constructor() {
    this.events = {}
  }
   
  // 订阅事件
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    // 返回取消订阅函数
    return () => this.unsubscribe(event, callback)
  }

  // 发布事件
  publish(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args))
    }
  }

  // 取消订阅事件
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }

  // 清除所有订阅者
  clear() {
    this.events = {}
  }
}

// 创建一个全局的事件总线实例
const eventBus = new EventBus()
// 导出事件总线实例
export default eventBus

// 使用示例
// import eventBus from './eventBus.js'
// eventBus.subscribe('eventName', (data) => {
//   console.log('Event received:', data)
// })
// eventBus.publish('eventName', { key: 'value' })
