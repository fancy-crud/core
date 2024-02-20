import { handlers } from '../axioma'

export class RegisterCommandHandler {
  public execute<T>(identifier: T extends { name: string } ? T : string, value: any) {
    const handlerId: string = typeof identifier === 'string' ? identifier : identifier.name

    if (!value)
      throw new Error('Should specify a handler for naming handlers')

    handlers.set(handlerId, value)

    return handlerId
  }
}

export const registerCommandHandler = new RegisterCommandHandler().execute
