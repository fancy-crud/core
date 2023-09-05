import { describe, expect, it } from 'vitest'

import { Url } from '@packages/core/common/http/axioma/value-objects/url'

describe('Url', () => {
  it('should initialize with no lookupValue', () => {
    const url = new Url('https://example.com')
    expect(url.value).toBe('https://example.com/')
  })

  it('should initialize with a string lookupValue', () => {
    const url = new Url('https://example.com', 'resource')
    expect(url.value).toBe('https://example.com/resource/')
  })

  it('should initialize with a numeric lookupValue', () => {
    const url = new Url('https://example.com', 123)
    expect(url.value).toBe('https://example.com/123/')
  })

  it('should handle trailing slashes in the URL', () => {
    const url1 = new Url('https://example.com/')
    expect(url1.value).toBe('https://example.com/')

    const url2 = new Url('https://example.com/', 'resource')
    expect(url2.value).toBe('https://example.com/resource/')

    const url3 = new Url('https://example.com/', 123)
    expect(url3.value).toBe('https://example.com/123/')
  })

  it('should handle undefined lookupValue', () => {
    const url = new Url('https://example.com', undefined)
    expect(url.value).toBe('https://example.com/')
  })
})
