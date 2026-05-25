class A {
   a: number

  constructor() {
    this.a = 1
  }
  
  test = () => {
    console.log('this')
    console.log(this.a)
  }
}

const a1 = new A()
a1.a = 200
a1.test()

const a2 = new A()
a2.test()

