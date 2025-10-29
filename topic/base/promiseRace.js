// 实现promise.race
Promise._race = function (arr) {
  return new Promise((resolve, reject) => {
    arr.forEach(p => {
      p.then((res) => {
        resolve(res)
      })
    });
  })
}

Promise._all = function promiseAll(promises) {
  // 检查输入是否为可迭代对象
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError('Argument is not iterable'));
  }

  // 如果传入的是空数组，立即返回一个已解决的 Promise
  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  // 创建一个数组来保存所有的结果
  const result = [];
  let resolvedCount = 0;
  let rejectionReason;

  // 创建一个新的 Promise 来表示所有 Promise 的完成状态
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          // 第一个被拒绝的 Promise 会触发整体的拒绝
          if (rejectionReason === undefined) {
            rejectionReason = reason;
            reject(rejectionReason);
          }
        }
      );
    });
  });
}


Promise._allSettle = function allSettle(promises) {
  // 检查输入是否为可迭代对象
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError('Argument is not iterable'));
  }

  // 如果传入的是空数组，立即返回一个已解决的 Promise
  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  // 创建一个数组来保存所有的结果
  const result = [];
  let resolvedCount = 0;
  let rejectionReason;

  // 创建一个新的 Promise 来表示所有 Promise 的完成状态
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          result[index] = reason;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(result);
          }
        }
      );
    });
  });
}