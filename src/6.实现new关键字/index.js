// * 刚刚看红宝书的时候想起来好久没写这个了...
// * 使用 new 调用构造函数, 大致流程:
// * 1. 内存中创建一个新对象.
// * 2. 该对象内部的 [[Prototype]]即(\_\_proto\_\_) 被赋值为构造函数的 prototype 属性.
// * 3. 构造函数的内部的 this 指向该对象.
// * 4. 执行构造函数的操作~
// * 5. 如果构造函数没有显式返回其他对象({}, function, array), 就返回刚刚创建的对象.

function New(func, ...args) {
  // 创建对象, 并将该对象的 __proto__ 赋值为构造函数的 prototype (1, 2)
  const o = Object.create(func.prototype)
  // 绑定 this, 并执行 func 函数 (3, 4)
  const res = func.apply(o, args)
  // 如果构造函数返回值是一个对象, 就直接返回它的. (5)
  return res instanceof Object ? res : o
}

function Person(name, age) {
  this.name = name
  this.age = age
}
const p = New(Person, 'ye yu', 11)
console.log(p) //
