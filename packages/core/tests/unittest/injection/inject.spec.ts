import { describe, expect, it } from 'vitest'
import { handlers } from '@packages/core/index'
import { CapabilityCommand, CapabilityHandler, execute } from './factory/injectable'

handlers.set(CapabilityHandler.name, CapabilityHandler)

describe('Injectable', () => {
  it('should inject services into class', () => {
    let result: boolean
    result = execute(new CapabilityCommand())

    expect(result).toBeFalsy()

    result = execute(new CapabilityCommand('Mensaje'))

    expect(result).toBeTruthy()
  })
})
