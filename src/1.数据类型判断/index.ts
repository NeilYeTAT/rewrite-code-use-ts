function yeTypeof(o: any) {
  // return Object.prototype.toString.call(o).slice(8, -1)
  return {}.toString.call(o).slice(8, -1)
}

console.log(yeTypeof(1))
console.log(yeTypeof('a'))
console.log(yeTypeof(1n))
console.log(yeTypeof(false))
console.log(yeTypeof({}))
console.log(yeTypeof([]))
console.log(yeTypeof(() => () => 1))
console.log(yeTypeof(Symbol()))
console.log(yeTypeof(null))
console.log(yeTypeof(undefined))
