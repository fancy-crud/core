import type { HandlerDefinition, MetaReturn } from '../axioma'
import { HandlerDoesNotExist, handlers } from '../axioma'

export function meta<T extends HandlerDefinition>(handlerDefinition: T): MetaReturn<T> {
  return Object.freeze({
    Handler: (...providers: any[]) => {
      const HandlerInstanceGenerator = handlers.get(handlerDefinition.name)
      let handlerInstance: any

      if (!HandlerInstanceGenerator)
        throw new HandlerDoesNotExist(handlerDefinition.name)

      if (providers && Array.isArray(providers))
        handlerInstance = new HandlerInstanceGenerator(...(providers as any[]))

      else
        handlerInstance = new HandlerInstanceGenerator()

      return handlerInstance
    },
  }) as MetaReturn<T>
}
