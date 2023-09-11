import { handlers } from '@packages/core/common/bus/axioma'
import { Bus } from '@packages/core/common/bus/capabilities'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserCommand, CreateUserHandler } from './factory/create-user'
import { CreateUserWithDependencyCommand, CreateUserWithDependencyHandler } from './factory/create-user-with-dependency'
import { CreateUserWithNestedDependencyCommand, CreateUserWithNestedDependencyHandler } from './factory/create-user-with-nested-dependencies'
import { AsyncCreateUserCommand, AsyncCreateUserHandler } from './factory/async-create-user'

describe('Bus', () => {
  let bus: Bus

  beforeEach(() => {
    bus = new Bus()
  })

  it('should execute a command', () => {
    handlers.set(CreateUserHandler.name, CreateUserHandler)
    const command = new CreateUserCommand('fancy-crud', 100)

    const output = bus.execute(command)
    expect(output).toBe(command)
  })

  it('should inject dependencies to command handler', () => {
    handlers.set(CreateUserWithDependencyHandler.name, CreateUserWithDependencyHandler)
    const command = new CreateUserWithDependencyCommand('fancy-crud', 100)

    const result = bus.execute(command)

    expect(result).toBeTruthy()
  })

  it('should inject nested dependencies to command handler', () => {
    handlers.set(CreateUserWithNestedDependencyHandler.name, CreateUserWithNestedDependencyHandler)
    const command = new CreateUserWithNestedDependencyCommand('fancy-crud', 100)

    const result = bus.execute(command)

    expect(result).toBeTruthy()
  })

  it('should execute a command that returns a promise', async () => {
    handlers.set(AsyncCreateUserHandler.name, AsyncCreateUserHandler)
    const command = new AsyncCreateUserCommand('fancy-crud', 100)

    const result = await bus.execute(command)

    expect(result).toBe(command)
  })
})
