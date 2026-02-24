function logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value as (...args: any[]) => any;

    descriptor.value = function (this: any, ...args: any[]) {
        console.log('logger before:', propertyKey)
        originalMethod.call(this, ...args)
        console.log('logger after:', propertyKey);
    }

    return descriptor;
}

function ppLogger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value as (...args: any[]) => any;

    descriptor.value = function (this: any, ...args: any[]) {
        console.log('pp logger before:', propertyKey)
        originalMethod.call(this, ...args)
        console.log('pp logger after:', propertyKey);
    }

    return descriptor;
}


class Person {

    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    @logger
    @ppLogger
    toString(...args: any[]) {
        console.log('toString:', this.name, this.age)
    }
}

const p = new Person('John', 18)
p.toString(1, 2, 3)