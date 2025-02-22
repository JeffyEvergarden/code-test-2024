// 伪代码：任务调度逻辑
const channel = new MessageChannel();
let scheduledTask = false;

// 通过 MessageChannel 触发任务执行
function scheduleWork() {
    if (!scheduledTask) {
        scheduledTask = true;
        channel.port2.postMessage(null);
    }
}

channel.port1.onmessage = () => {
    scheduledTask = false;
    // 执行任务分片
    performWorkUntilDeadline();
};

function performWorkUntilDeadline() {
    const startTime = performance.now();
    const deadline = startTime + 5; // 每段任务最多执行 5ms

    // 执行任务，直到时间用尽或任务完成
    while (currentTask !== null && performance.now() < deadline) {
        currentTask = executeTask(currentTask);
    }

    // 若任务未完成，继续调度
    if (currentTask !== null) {
        scheduleWork();
    }
}

// scheduleWork --->  channel.port2.postMessage(null); ----> channel.port1.onmessage ---> performWorkUntilDeadline ---->  scheduleWork
