import { handlers } from '../axioma'
import type { BusCommand, BusHandlerInstance, IBaseCommand, IBus, IBusExecuteReturn } from '../axioma'

export class Bus implements IBus {
  private hasImplicitHandler(command: BusCommand | IBaseCommand): command is BusCommand {
    return (command as BusCommand).meta !== undefined
  }

  private implicitHandler(command: BusCommand, providers?: any[]) {
    let handler: BusHandlerInstance
    if (providers && Array.isArray(providers))
      handler = command.meta.Handler(...(providers as any[]))

    else handler = command.meta.Handler()

    return handler.execute(command)
  }

  private mapHandler(command: IBaseCommand, providers?: any[]) {
    const HandlerClass = handlers.get(command.constructor.name)

    let handler: any

    if (providers && Array.isArray(providers))
      handler = new HandlerClass(...(providers as any[]))

    else
      handler = new HandlerClass()

    return handler.execute(command)
  }

  execute<U extends BusCommand | IBaseCommand>(command: U, providers?: any[]): IBusExecuteReturn<U> {
    if (this.hasImplicitHandler(command))
      return this.implicitHandler(command, providers)

    return this.mapHandler(command, providers)
  }
}
