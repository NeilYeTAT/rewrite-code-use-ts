// 不管多少层, 全部打平

function yeFlat<T>(array: T[]) {
  // let res: T[] = []

  // for (let item of array) {
  //   if (Array.isArray(item)) {
  //     res = [...res, ...yeFlat(item)]
  //   } else {
  //     res = [...res, item]
  //   }
  // }

  // return res

  return array.reduce(
    (res, v): any => (Array.isArray(v) ? [...res, ...yeFlat(v)] : [...res, v]),
    [],
  )
}

console.log(yeFlat([1, [2, [3]], [4, [5, [6, [7, [8]]]]]]))

// leetcode https://leetcode.cn/problems/flatten-deeply-nested-array/description/
// 加个判断, 根据传入的深度打平
// * 函数式写法超时...

function yeFlatByN<T>(array: T[], depth: number) {
  // let res: T[] = []
  // for (let item of array) {
  //   if (Array.isArray(item) && depth > 0) {
  //     res = [...res, ...yeFlatByN(item, depth - 1)]
  //   } else {
  //     res = [...res, item]
  //   }
  // }
  // return res

  return array.reduce(
    (res, v): any =>
      Array.isArray(v) && depth > 0
        ? [...res, ...yeFlatByN(v, depth - 1)]
        : [...res, v],
    [],
  )
}

console.log(yeFlatByN([1, [2, [3]], [4, [5, [6, [7, [8]]]]]], 2))
console.log(yeFlatByN([1, 2, [3, [4]]], 1))

function flat<T>(arr: T[], n: number) {
  if (n === 0) return arr
  return arr.reduce((res, item): any => {
    if (Array.isArray(item) && n > 0) {
      res.push(...flat(item, n - 1))
    } else {
      res.push(item)
    }
    return res
  }, [] as T[])
}
