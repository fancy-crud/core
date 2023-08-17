import { CreateUserHandler } from './factory/create-user'
import { HandlerDoesNotExist } from '@packages/core/common/bus/axioma'
import { MapCommands } from '@packages/core/common/bus/capabilities'

// Mock the handlers map (You should adapt this to your actual implementation)
const mockHandlers = new Map<string, any>()
mockHandlers.set('MyCommand', { handler: 'MyCommandHandler' });
(mockHandlers as any).get = (key: string) => mockHandlers.get(key)

// Create an instance of MapCommands with the mock handlers
const mapCommands = new MapCommands()

describe('MapCommands', () => {
  it('should execute a command when a handler is found', () => {
    const commandName = 'MyCommand'

    handlers.set(commandName, { handler: CreateUserHandler, dependencies: [] })

    const handlerObject = mapCommands.execute(commandName)
    expect(handlerObject.handler).toEqual(CreateUserHandler)
  })

  it('should throw HandlerDoesNotExist when a handler is not found', () => {
    const commandName = 'NonExistentCommand'
    expect(() => mapCommands.execute(commandName)).toThrowError(
      HandlerDoesNotExist,
    )
  })

  it('should throw HandlerDoesNotExist with the correct error message', () => {
    const commandName = 'NonExistentCommand'
    expect(() => mapCommands.execute(commandName)).toThrowError(
      new HandlerDoesNotExist(commandName),
    )
  })
})
