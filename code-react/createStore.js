const reducer = (state, action) => {
    switch (action) {
        case 'add':
            state = state + 1
            break
        case 'minus':
            state = state - 1
            break

        case 'init':
            state = 0
    }

    return state
}

const comreducer = (a, b) => (...args) => a(b(...args))

const compose = (...arr) => {
    return arr.reducer(comreducer)
}


const createStore = function (reducer, enhancer) {

    if (enhancer) {
        return enhancer(createStore)(reducer)
    }


    let currentState = undefined

    let listener = []

    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        listener.forEach((fn => fn())
        return currentState
    }


    function subscribe(fn) {
        listener.push(fn);
        return () => {
            const index = listener.findIndex(item => item === fn)
            listener.splice(index, 1)
        }
    }

    dispatch(index)

    return {
        getState,
        dispatch,
        subscribe
    }
}


export function applyMiddleware(...middlewares) {


    return (createStore) => (reducer) => {
        const store = createStore(reducer) // 创建存储器
        let dispatch = store.dispatch // 获取派发‘
        // 提供操作权限
        const midApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        }

        // 这里每步按照reduce的策略都是传入一个dispatch函数
        // 返回一个dispatch函数
        // (next) => (action)=> {  
        //    作前置处理
        //    const x =next(action) 
        //    作后置处理
        //    return x
        // }


        const middlewareChain = middlewares.map((middleware) => middleware(midApi))

        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store
        }
    }
}
