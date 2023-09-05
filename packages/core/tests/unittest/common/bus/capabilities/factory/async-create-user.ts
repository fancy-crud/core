import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class AsyncCreateUserCommand implements BaseCommand {
  public readonly meta = meta(AsyncCreateUserHandler)
  constructor(public readonly name: string, public readonly age: number) {}
}

export class AsyncCreateUserHandler {
  async execute(command: AsyncCreateUserCommand) {
    return new Promise(resolve => resolve(command))
  }
}
