function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            // 将回调作为最后一个参数添加到 args 数组中
            args.push((err, ...results) => {
                if (err) {
                    return reject(err);
                }
                // 如果有多个结果值，只传递第一个，或者全部传递取决于需求
                resolve(results.length > 1 ? results : results[0]);
            });

            // 调用原始函数并传入新的参数列表
            fn.apply(this, args);
        });
    };
}