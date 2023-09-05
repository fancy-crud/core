import { describe, expect, it } from 'vitest'
import { CapabilityCommand, execute } from './factory/injectable'

describe('Injectable', () => {
  it('should inject services into class', () => {
    let result: boolean
    result = execute(new CapabilityCommand())

    expect(result).toBeFalsy()

    result = execute(new CapabilityCommand('Mensaje'))

    expect(result).toBeTruthy()
  })
})
