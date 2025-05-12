// 功能 并发任务， 同时只能执行两个任务

// 生成任务
const genTask = time => {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time)
      }, time * 1000)
    })
}
// 执行要这样 genTask(1)()
// genTask(1)().then(res => console.log(res))

class TaskPool {
  constructor() {
    this.pool = []
    this.result = []
    this.max = 2 // 最大执行任务数
    this.cur = 0 // 当前执行任务数
    this.index = 0 // 当前任务队列序号
  }

  push(task) {
    return new Promise((resolve, reject) => {
      this.pool.push(task)
      this.run()
      resolve()
    })
  }

  run() {
    if (this.cur < this.max) {
      const index = this.index
      if (index >= this.pool.length) {
        return
      }
      this.cur++
      this.index++
      this.pool[index]().then(res => {
        console.log('任务序号：', index, '结果', res)
        this.result[index] = res
        this.cur--
        // 继续执行
        this.run()
      })
    } else {
      return
    }
  }
}

const taskPool = new TaskPool()

const addTask = (time, order) => {
  taskPool.push(genTask(time)).then(() => console.log('加入顺序:', order))
}

addTask(2, 1)
addTask(10, 2)
addTask(9, 3)
addTask(1, 4)

// taskPool.push(genTask(2))
// taskPool.push(genTask(10))
// taskPool.push(genTask(3))
// taskPool.push(genTask(1))
// 2、 3、 10、1
