export interface StoreMap<T> {
  set(key: symbol, value: T): void
  get(key: symbol): T | undefined
  delete(key: symbol): void
}

export interface Store<T> {
  set: (value: T) => void
  get: () => T
  delete: () => void
}
