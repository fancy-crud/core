export interface Proxy {
  fn: () => any
  target: Record<string, any>
  isDeep?: boolean
}

export type ArgProxy<T> = (() => T) | T
