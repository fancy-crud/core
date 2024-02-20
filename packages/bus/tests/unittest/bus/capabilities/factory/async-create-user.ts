import type { BaseCommand } from '@packages/bus/axioma'
import { meta } from '@packages/bus/capabilities'

export class AsyncCreateUserCommand implements BaseCommand {
  public readonly meta = meta(AsyncCreateUserHandler)
  constructor(public readonly name: string, public readonly age: number) {}
}

export class AsyncCreateUserHandler {
  async execute(command: AsyncCreateUserCommand) {
    return new Promise(resolve => resolve(command))
  }
}
