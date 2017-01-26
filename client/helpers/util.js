export const chunk = (a, c) => {
  return a.reduce((accum, next, i) => {
    const intI = Math.floor(i / c)
    return Object.assign([], accum, {
      [intI]: [...accum[intI], next]
    })
  }, Array(Math.ceil(a.length / c)).fill([]))
}

export const unfold = (func, s) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(func, s, [])
}

export const range = (i, end) => {
  return unfold((x) => {
    if (x < end) return [x, x + 1]
    return null
  }, i)
}

export function countMap(f, c, step = 1) {
  return unfold((x) => {
    if (x < c * step) return [f(x), x + step]
    return null
  }, 0)
}
