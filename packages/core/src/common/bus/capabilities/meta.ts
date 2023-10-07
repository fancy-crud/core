import type { HandlerDefinition, MetaReturn, MetaReturnHandler } from '../axioma'
import { HandlerDoesNotExist, handlers } from '../axioma'

export function meta<T extends HandlerDefinition>(handlerDefinition: T): MetaReturn<T> {
  return {
    Handler(...providers: any[]): MetaReturnHandler<T> {
      const HandlerInstanceGenerator = handlers.get(handlerDefinition.name)
      let handlerInstance: MetaReturnHandler<T>

      if (!HandlerInstanceGenerator)
        throw new HandlerDoesNotExist(handlerDefinition.name)

      if (providers && Array.isArray(providers))
        handlerInstance = new HandlerInstanceGenerator(...(providers as any[]))

      else
        handlerInstance = new HandlerInstanceGenerator()

      return handlerInstance
    },
  }
}
