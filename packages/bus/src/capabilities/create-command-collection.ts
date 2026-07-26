import type { CommandCollection, CreateCommandCollection, DefaultSuffix } from '../axioma'
import { Bus } from './bus'

export function createCommandCollection<T extends Record<any, any>, Suffix extends string = DefaultSuffix>(obj: CreateCommandCollection<T, Suffix>): CommandCollection<T, Suffix> {
  const DEFAULT_SUFFIX = 'Command'
  const bus = new Bus()

  const services: Record<any, any> = {}

  const noSuffix = (obj.options?.noSuffix || DEFAULT_SUFFIX) as Suffix

  function lowercaseFirstLetter(str: string): string {
    const [firstLetter, ...rest] = str
    return firstLetter.toLowerCase() + rest.join('')
  }

  function removePrefix(str: string): string {
    return str.replace(noSuffix, '')
  }

  Object.entries(obj.collection).forEach(([key, Command]) => {
    let serviceKey = lowercaseFirstLetter(key)
    serviceKey = removePrefix(serviceKey)

    services[serviceKey] = (...args: any) => bus.execute(
      new Command(...args),
    )
  })

  return services as CommandCollection<T, Suffix>
}
