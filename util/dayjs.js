const dayjs = require('dayjs')

const endTime = dayjs(new Date()).add(1, 'day').startOf('day')

console.log('endTime:', endTime.format('YYYY-MM-DD HH:mm:ss'))

// 当前时间
const now = new Date()
// 剩余时间
const remainingTime = endTime.valueOf() - now.getTime()

const newTime = remainingTime + now.getTimezoneOffset() * 60000

const time = new Date(newTime)

console.log(now.toLocaleTimeString())
console.log(time.toLocaleTimeString())

console.log('hour:', time.getHours(), Math.floor(remainingTime / (1000 * 60 * 60)))
console.log('minute:', time.getMinutes(), Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)))
console.log('second:', time.getSeconds(), Math.floor((remainingTime % (1000 * 60)) / 1000))
