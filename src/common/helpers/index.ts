export function enumGenerator<T extends string>(arr: T[]): { [k in T]: k } {
  const result = {} as { [k in T]: k }

  for (const item of arr)
    result[item] = item

  return Object.freeze(result)
}
