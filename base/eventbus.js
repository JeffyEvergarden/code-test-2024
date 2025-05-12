class Eventbus {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return () => this.unsubscribe(event, callback) // 返回取消订阅函数
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
const eventbus = new Eventbus()
// 导出事件总线实例
export default eventbus


// 使用示例
// import eventbus from './eventbus.js'
// eventbus.subscribe('eventName', (data) => {
//   console.log('Event received:', data)
// })
// eventbus.publish('eventName', { key: 'value' })  
