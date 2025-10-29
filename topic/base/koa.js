
function compose(mids) {

  return function (ctx, next) {

      function dispatch(i) {

          let fn = mids[i]

          if (i === mids.length) {
              fn = next
          }
          if (!fn) {
              return Promise.resolve();
          }

          return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      }

      return dispatch(0)
  }
}


function compose(mids) {
  return function (ctx, next) {
      function dispath(i) {
          let fn = mids[i]


          if (i === mids.length) {
              fn = next
          }

          if (!fn) {
              return Promise.resolve()
          }

          const nextFn = () => {
              return dispath(i + 1)
          }

          return Promise.resolve(fn(ctx, nextFn))

      }

  }
}