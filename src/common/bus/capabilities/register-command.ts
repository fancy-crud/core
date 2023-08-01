import { handlers } from '../axioma'
import type { BusCommand, BusHandler } from '../axioma/typing'

export class RegisterCommand {
  execute(command: BusCommand, handler: BusHandler, dependencies: symbol[] = []) {
    handlers.set(command.name, { handler, dependencies })
  }
}

export const registerCommand = new RegisterCommand()
