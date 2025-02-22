import { reactive, effect } from './index.js'

const obj = reactive({ name: 'jeffy', age: 20 })

effect(() => {
  console.log(obj.name, obj.age)
})

setTimeout(() => {
  obj.age++
  obj.name = 'shuqing'
  console.log(obj.name);
}, 1000)