## IMMUTABLE

* fromJS() 深层转换js对象和数组成map对象和list

  `fromJS(json: any, reviver?: (k: any, v: Iterable<any, any>) => any): any`

* is() 判断语法，类似于Object.is

  `is(first: any, second: any): boolean`

* Range() 范围数组，返回indexed

  `Range(start?: number, end?: number, step?: number): Seq.Indexed<number>`

* Repeat() 重复数组

  `Repeat<T>(value: T, times?: number): Seq.Indexed<T>`
