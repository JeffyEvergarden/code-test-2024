type SniffData = {
    name: string
    age: number
}
/** 返回 Promise<SniffData[]> 的类方法类型，带 this 便于装饰器替换后保持实例类型 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = any[]

type ProcessingFn<This = unknown> = (this: This, ...args: Args) => Promise<SniffData[]>
type Fn = (...args: Args) => Promise<SniffData[]>

function wrap<This>(fn: Fn, source?: string): ProcessingFn<This> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async function (this: This, ...args: any[]): Promise<SniffData[]> {
        if (source) {
            console.log(`sendResource by: ${source}`)
        }
        const dataList = await fn.call(this, ...args)
        console.log('dataList:', dataList)
        return dataList
    }
}

/** 无参 @sendResources：标准方法装饰器 (value, context) */
function sendResources<This>(
    value: Fn,
    _context: ClassMethodDecoratorContext<This, ProcessingFn<This>>,
): ProcessingFn<This>

/** 带参 @sendResources('Name')：返回的方法装饰器同样接收 (value, context) */
function sendResources(
    tag: string,
): (value: Fn, _context: ClassMethodDecoratorContext<unknown, ProcessingFn<unknown>>) => ProcessingFn<unknown>

function sendResources(valueOrTag: Fn | string) {
    if (typeof valueOrTag === 'string') {
        return (value: ProcessingFn<unknown>, _context: ClassMethodDecoratorContext<unknown, ProcessingFn<unknown>>) =>
            wrap(value, valueOrTag)
    }
    return wrap(valueOrTag)
}

class Bar {
    @sendResources('bar')
    async toString(a: number, b: number): Promise<SniffData[]> {
        console.log(a, b)
        return [{ name: 'John', age: 18 }]
    }

    @sendResources('vvvv')
    async test() {
        return [{ name: 'tony', age: 18 }]
    }
}

const a = new Bar()
a.toString(1, 2)

a.test()

