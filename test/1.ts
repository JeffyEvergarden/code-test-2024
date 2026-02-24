function deco(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value
  descriptor.value = function (this: any, ...args: any[]) {
    return original!.call(this, ...args)
  }
  return descriptor
}

class A {
  private name: string

  constructor() {
    this.name = 'A'
  }

  @deco
  static process() {
    console.log('process')
    console.log(this.name)
  }

  say() {
    console.log(this.name)
  }
}
