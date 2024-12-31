// -------------- 工具函数
function isObject(o: any) {
  return typeof o === 'object' && o !== null
}

function getSpecificType(o: any) {
  const typeMap = new Map<Function, () => any>([
    [Array, () => []],
    [Date, () => new Date(o)],
    [RegExp, () => new RegExp(o.source, o.flags)],
  ])

  for (const [type, factory] of typeMap) {
    if (o instanceof type) {
      return factory()
    }
  }

  return {}
}
// --------------

// * stringify 的局限
// * 1 - 无法处理循环引用 `const a: any = {}; a.b = a`
// * 2 - 无法处理 Map, Set, Regex, 会变成空对象 {}
// * 3 - 无法处理 Date, 会变成 string 类型
// * 4 - 无法处理 函数, undefined, Symbol, 会变成空对象 {}
// * 5 - 丢失原型链, 且性能不好

// function deepClone(obj: any) {
//   return JSON.parse(JSON.stringify(obj))
// }

// * 没有解决循环引用
// * 还是无法处理 Date, Reg, Symbol

// function deepClone(source: any) {
//   if (isObject(source)) {
//     const _target: any = Array.isArray(source) ? [] : {}

//     for (const k in source) {
//       _target[k] = deepClone(source[k])
//     }

//     return _target
//   }

//   return source
// }

// * 使用 Map 解决循环引用, 但无法处理 Date, Reg, Symbol

// function deepClone(source: any, cloneMap = new Map()) {
//   if (isObject(source)) {
//     if (cloneMap.has(source)) {
//       return cloneMap.get(source)
//     }

//     const _target: any = Array.isArray(source) ? [] : {}
//     cloneMap.set(source, _target)

//     for (const k in source) {
//       _target[k] = deepClone(source[k], cloneMap)
//     }

//     return _target
//   }

//   return source
// }

// * 解决 Date 和 Reg 无法拷贝的问题
// * 无法处理 Symbol

// function deepClone(source: any, cloneMap = new Map()) {
//   if (isObject(source)) {
//     if (cloneMap.has(source)) {
//       return cloneMap.get(source)
//     }

//     const _target: any = getSpecificType(source)
//     cloneMap.set(source, _target)

//     for (const k in source) {
//       if (isObject(source[k])) {
//         _target[k] = deepClone(source[k], cloneMap)
//       }
//     }

//     return _target
//   }

//   return source
// }

// * 完善的深拷贝函数, 但 for in 遍历会拷贝原型链上的属性, 具体是否拷贝原型链, 看设计

function deepClone(source: any, cloneMap = new Map()) {
  if (isObject(source)) {
    if (cloneMap.has(source)) {
      return cloneMap.get(source)
    }

    const _target: any = getSpecificType(source)
    cloneMap.set(source, _target)

    const allKeys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source),
    ]

    allKeys.forEach(k => (_target[k] = deepClone(source[k], cloneMap)))

    return _target
  }

  return source
}

const testObject = {
  // 基本类型
  number: 42,
  string: 'Hello, world!',
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  // 数组
  array: [1, 2, 3, { nested: 'array' }],
  // 嵌套对象
  nestedObject: {
    a: 1,
    b: {
      c: 2,
    },
  },
  // 日期类型
  date: new Date('2024-12-29'),
  // 正则表达式
  regex: /deepCloneTest/i,
  // Symbol 属性
  [Symbol('sym1')]: 'symbolValue1',
  [Symbol('sym2')]: { nested: 'symbolObject' },
  // 函数属性（应当跳过或复制引用）
  func: function () {
    return 'I am a function'
  },
  arrowFunc: () => 'I am an arrow function',
  // Set 和 Map
  set: new Set([1, 2, { nested: 'set' }]),
  map: new Map<any, any>([
    ['key1', 'value1'],
    ['key2', { nested: 'map' }],
  ]),

  // 不可枚举属性
  get nonEnumerableProp() {
    return 'non-enumerable'
  },

  // 自定义对象原型
  customProtoObject: Object.create(
    {
      inheritedProp: 'inherited',
    },
    {
      ownProp: {
        value: 'own',
        enumerable: true,
      },
    },
  ),
}

const t = deepClone(testObject)
console.log(t)
console.log(testObject)
