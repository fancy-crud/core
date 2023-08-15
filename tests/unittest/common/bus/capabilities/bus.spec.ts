import { CreateUserCommand } from './factory/create-user'
import { CreateUserWithDependencyCommand } from './factory/create-user-with-dependency'
import { CreateUserWithNestedDependencyCommand } from './factory/create-user-with-nested-dependencies'
import { AsyncCreateUserCommand } from './factory/async-create-user'
import { Bus } from '@/common/bus/capabilities'

describe('Bus', () => {
  let bus: Bus

  beforeEach(() => {
    bus = new Bus()
  })

  it('should execute a command', () => {
    const command = new CreateUserCommand('fancy-crud', 100)

    const output = bus.execute(command)
    expect(output).toBe(command)
  })

  it('should inject dependencies to command handler', () => {
    const command = new CreateUserWithDependencyCommand('fancy-crud', 100)

    const result = bus.execute(command)

    expect(result).toBeTruthy()
  })

  it('should inject nested dependencies to command handler', () => {
    const command = new CreateUserWithNestedDependencyCommand('fancy-crud', 100)

    const result = bus.execute(command)

    expect(result).toBeTruthy()
  })

  it('should execute a command that returns a promise', async () => {
    const command = new AsyncCreateUserCommand('fancy-crud', 100)

    const result = await bus.execute(command)

    expect(result).toBe(command)
  })
})
