export class HandlerDoesNotExist extends Error {
  constructor(commandName: string) {
    super(`Handler not found for command: ${commandName}`)
    Object.setPrototypeOf(this, HandlerDoesNotExist.prototype)
    this.name = 'HandlerDoesNotExist'
  }
}
