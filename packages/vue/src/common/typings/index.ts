export interface Proxy {
  fn: (data?: any) => any
  target: Record<string, any>
  isDeep?: boolean
}

export type ArgProxy<T, U = any> = ((data?: U) => T) | T
