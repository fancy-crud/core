export class CreateUserCommand {
  constructor(public readonly name: string, public readonly age: number) {}
}

export class CreateUserHandler {
  execute(command: CreateUserCommand) {
    return command
  }
}

registerCommand.execute(CreateUserCommand, CreateUserHandler)

