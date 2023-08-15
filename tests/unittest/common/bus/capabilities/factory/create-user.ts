import type { BaseCommand } from '@/common/bus/axioma'

export class CreateUserCommand implements BaseCommand {
  public readonly meta = meta(CreateUserHandler)
  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserHandler {
  execute(command: CreateUserCommand) {
    return command
  }
}

