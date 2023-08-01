import { CreateUserCommand } from './capabilities-factory/create-user'
import { CreateUserWithDependencyCommand } from './capabilities-factory/create-user-with-dependency'
import { CreateUserWithNestedDependencyCommand } from './capabilities-factory/create-user-with-nested-dependencies'
import { Bus } from '@/common/bus/capabilities'

describe('Test Bus', () => {
  let bus: Bus

  beforeEach(() => {
    bus = new Bus()
  })

  it('should register capability', () => {
    const command = new CreateUserCommand('Christopher', 100)

    const output = bus.execute<CreateUserCommand>(command)
    expect(output).toBe(command)
  })

  it('should inject dependencies to command handler', () => {
    const command = new CreateUserWithDependencyCommand('Christopher', 100)

    const result = bus.execute(command)

    expect(result).toBeTruthy()
  })

  it('should inject nested dependencies to command handler', () => {
    const command = new CreateUserWithNestedDependencyCommand('Christopher', 100)

    const result = bus.execute(command)

    expect(result).toBeTruthy()
  })
})
