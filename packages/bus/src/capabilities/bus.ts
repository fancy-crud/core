import type { BusCommand, BusHandlerInstance, CommandReturn, IBus, Providers } from '../axioma'

export class Bus implements IBus {
  execute<U extends BusCommand>(command: U, providers?: Providers<U['meta']['Handler']>): CommandReturn<U> {
    let handler: BusHandlerInstance

    if (providers && Array.isArray(providers))
      handler = command.meta.Handler(...(providers as any[]))

    else handler = command.meta.Handler()

    return handler.execute(command)
  }
}
