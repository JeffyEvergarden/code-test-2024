type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

interface Person {
  name: string
  age: number
  other: {
    height: number
    width: number
    moreDetails: {
      hairColor: string
      eyeColor: string
    }
  }
}

// 使用 DeepPartial 将所有层级的属性都设为可选
type OptionalPerson = DeepPartial<Person>

const p: OptionalPerson = {
  name: '1',
  age: 3,
  other: {
    height: 4,
    width: 3,
    moreDetails: {
      hairColor: '2'
    }
  }
}
