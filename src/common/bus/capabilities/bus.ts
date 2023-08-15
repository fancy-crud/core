import type { BusCommandMeta, BusCommandMetaReturnType, BusHandlerInstance, IBus, Providers } from '../axioma'

export class Bus implements IBus {
  execute<U extends BusCommandMeta>(command: U, providers?: Providers<U['meta']['Handler']>): BusCommandMetaReturnType<U> {
    let handler: BusHandlerInstance<any>

    if (providers && Array.isArray(providers))
      handler = new command.meta.Handler(...(providers as any[]))
    else
      handler = new command.meta.Handler()

    return handler.execute(command)
  }
}
