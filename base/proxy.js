// const r1 = add[1][2][3] + 4  // 10
// const r2 = add[10][20] + 30 // 60
// const r3 = add[100][200][300] + 400 // = 1000

function createProxy(total = 0) {
  return new Proxy(
    {},
    {
      get(taget, key, receiver) {
        if (key === Symbol.toPrimitive) {
          return () => total
        }
        return createProxy(total + Number(key))
      },
    }
  )
}

const add = createProxy(0)

console.log(add[1][2][3] + 4)
