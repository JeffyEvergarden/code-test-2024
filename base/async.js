class Scheduler {
  constructor() {
    this.pool = []
    this.max = 2
    this.cur = 0
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.pool.push(task)
      this.run()
      resolve()
    })
  }

  run() {
    if (this.cur < this.max) {
      const task = this.pool.shift()
      if (!task) {
        return
      }
      this.cur++
      task()
        .then(res => {
          console.log(res)
        })
        .finally(() => {
          this.cur--
          this.run()
        })
    }
  }
}

const timeout = (time, order) =>
  new Promise(resolve => {
    setTimeout(() => resolve(order), time)
  })

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time, order)).then(() => console.log(order))
}

addTask(1, 1)
addTask(3, 2)
addTask(1, 3)
