import type { BaseCommand } from '@packages/bus/axioma'
import { meta } from '@packages/bus/capabilities'

export class CreateUserCommand implements BaseCommand {
  public readonly meta = meta(CreateUserHandler)
  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserHandler {
  execute(command: CreateUserCommand) {
    return command
  }
}

