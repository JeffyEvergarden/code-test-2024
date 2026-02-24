const dayjs = require('dayjs')
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc')

dayjs.extend(timezone)
dayjs.extend(utc)

dayjs.tz.setDefault('Asia/Tokyo')

const _now = dayjs.tz(new Date())

console.log('now:', _now.format('YYYY-MM-DD HH:mm:ss'))

const endoftoday = dayjs().startOf('day').add(1, 'day').toDate().getTime()

const now = new Date('2026-01-16 00:00:00')

console.log('今天的截止时间:', endoftoday, now.getTime())
