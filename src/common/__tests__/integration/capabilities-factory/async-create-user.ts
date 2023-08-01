export class AsyncCreateUserCommand {
  constructor(public readonly name: string, public readonly age: number) {}
}

export class AsyncCreateUserHandler {
  async execute(command: AsyncCreateUserCommand) {
    return new Promise(resolve => resolve(command))
  }
}

registerCommand.execute(AsyncCreateUserCommand, AsyncCreateUserHandler)

