function yeUnique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
  // return [...new Set(array)]
  // return array.filter((v, i, array) => array.indexOf(v) === i)
}

const arr = [1, 2, 2, 3, 4, 4, 5]
console.log(yeUnique(arr)) // 输出: [1, 2, 3, 4, 5]

// 需求变化, 不考虑大小写, 'a' 等同 'A', 请修改代码

function yeUnique2<T>(array: T[]): T[] {
  return Array.from(
    // * 需要类型断言
    new Set(array.map(v => (typeof v === 'string' ? v.toLowerCase() : v) as T)),
  )
}

const arr4 = ['a', 'b', 'A', 'C', 'c', 'B']

console.log(yeUnique2(arr4))

// * 高阶函数
function yeUniqueBy<T>(array: T[], mapper: (item: T) => any): T[] {
  const seen = new Set<any>()
  return array.filter(item => {
    const key = mapper(item)
    // * 逗号运算符 (o′ω`o)ノ
    return seen.has(key) ? false : (seen.add(key), true)
  })
}

// 使用示例
const result = yeUniqueBy(['A', 'a', 'B', 1, 1, 'b', NaN], v =>
  typeof v === 'string' ? v.toLowerCase() : v,
)
console.log(result) // 输出: ['A', 'B', 1]
