export function enumGenerator<T extends string>(arr: T[]): { [k in T]: k } {
  const result = {} as { [k in T]: k }

  for (const item of arr)
    result[item] = item

  return Object.freeze(result)
}

export function enumGeneratorKeyValue<T extends string, U = unknown>(arr: [T, U][]): Record<T, U> {
  const result = {} as Record<T, U>

  for (const [key, value] of arr)
    result[key] = value

  return result
}
