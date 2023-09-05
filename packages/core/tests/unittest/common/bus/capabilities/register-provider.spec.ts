import { RegisterProvider } from '@packages/core/common/bus/capabilities'
import { providers } from '@packages/core/common/bus/axioma'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('RegisterProvider', () => {
  beforeEach(() => {
    providers.clear()
  })

  it('should register a provider without dependencies', () => {
    const registerProvider = new RegisterProvider()
    const providerFunction = vi.fn()

    const providerKey = registerProvider.execute(providerFunction)

    expect(providers.has(providerKey)).toBe(true)
    expect(providers.get(providerKey)).toEqual(providerFunction)
  })

  it('should register a provider with dependencies', () => {
    const registerProvider = new RegisterProvider()
    const providerFunction = vi.fn()

    const providerKey = registerProvider.execute('providerFunction', providerFunction)

    expect(providers.has(providerKey)).toBe(true)
    expect(providers.get(providerKey)).toEqual(providerFunction)
  })

  it('should return the registered provider key', () => {
    const registerProvider = new RegisterProvider()
    const providerFunction = vi.fn()

    const providerKey = registerProvider.execute(providerFunction)

    expect(providerKey).toBeDefined()
    expect(typeof providerKey).toBe('string')
  })
})
