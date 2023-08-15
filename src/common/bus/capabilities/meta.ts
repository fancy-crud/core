import type { BusHandler, Meta } from '../axioma'

export function meta<T extends BusHandler>(handler: T): Meta<T> {
  return Object.freeze({
    Handler: handler,
  }) as Meta<T>
}
