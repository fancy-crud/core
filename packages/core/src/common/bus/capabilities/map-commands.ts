import { HandlerDoesNotExist, handlers } from '../axioma'

export class MapCommands {
  execute(commandName: string) {
    const handler = handlers.get(commandName)

    if (!handler)
      throw new HandlerDoesNotExist(commandName)

    return handler
  }
}
