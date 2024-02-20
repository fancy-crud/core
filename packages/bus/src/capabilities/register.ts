import { registerCommandHandler } from './register-command-handler'
import { injectable } from './register-provider'

export function register<T>(identifier: T extends { name: string } ? T : string, value?: any) {
  injectable(identifier, value)
  registerCommandHandler(identifier, value)
}
