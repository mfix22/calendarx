export const chunk = (a, c) => {
  return a.reduce((accum, next, i) => {
    const intI = Math.floor(i / c)
    return Object.assign([], accum, {
      [intI]: [...accum[intI], next]
    })
  }, Array(Math.ceil(a.length / c)).fill([]))
}

// function chunk(a, c) {
//   const chunks = []
//   let i = 0
//   let n = a.length

//   while (i < n) {
//     chunks.push(arr.slice(i, (i += c)))
//   }

//   return chunks
// }

export const unfold = (func, s) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(func, s, [])
}

export function countMap(f, c, step = 1) {
  return unfold(x => {
    if (x < c * step) return [f(x), x + step]
    return null
  }, 0)
}
