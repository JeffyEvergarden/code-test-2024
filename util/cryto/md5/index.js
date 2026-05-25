const crypto = require('crypto')
const str = '1229832571'



const result2 = 'b5b3f3949761af0708060cd413b937a3'

const md5 = crypto.createHash('md5')
md5.update(str)
const result = md5.digest('hex')
console.log(result)

const fn = async () => {

fn()