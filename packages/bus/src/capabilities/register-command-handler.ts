import { handlers } from '../axioma'

export class RegisterCommandHandler {
  public execute<T>(handler: T extends { name: string } ? T : string, value?: any) {
    let handlerId: string

    if (typeof handler === 'string') {
      if (!value)
        throw new Error('Should specify a handler for naming handlers')

      handlerId = handler
      handlers.set(handlerId, value)
    }
    else {
      handlerId = handler.name
      handlers.set(handlerId, handler)
    }

    return handlerId
  }
}

export const registerCommandHandler = new RegisterCommandHandler().execute
