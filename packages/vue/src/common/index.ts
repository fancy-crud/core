export * from './components'
export * from './composables'
export * from './typings'

export function ReturnObject<T extends Record<string, unknown>>(obj: T): T {
  return { ...obj }
}
