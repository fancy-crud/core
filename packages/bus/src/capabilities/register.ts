import { registerCommandHandler } from './register-command-handler'
import { injectable } from './register-provider'

export function register<T>(handler: T extends { name: string } ? T : string, value?: any) {
  injectable(handler, value)
  registerCommandHandler(handler, value)
}
