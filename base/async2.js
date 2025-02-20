class TaskPool {
    constructor(max) {
        this.max = max
        this.taskList = []
        this.cur = 0
    }

    add(task) {
        this.taskList.push(task);
        this.run()
    }

    run() {
        if (this.taskList.length && this.cur < this.max) {
            const task = this.taskList.shift();
            this.cur++;
            task().finally(() => {
                this.cur--;
                this.run();
            })
        }
    }
}

const taskpool = new TaskPool(2)

for (let i = 0; i < 10; i++) {
    const task = () =>
        new Promise((resolve) => {
            setTimeout(() => {
                console.log(`task${i} complete`)
                resolve(`task${i}`)
            }, 2000)
        })
    taskpool.add(task)
}
