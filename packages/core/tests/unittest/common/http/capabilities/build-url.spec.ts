import { FORM_MODE } from '@packages/core/forms/axioma'
import { ParseUrlCommand } from '@packages/core/common/http/axioma'
import { ParseUrlHandler } from '@packages/core/common/http/capabilities'
import { describe, expect, it } from 'vitest'

describe('BuildUrlHandler', () => {
  const trackRecord = {
    id: 1,
    album_id: 100,
    name: 'Test',
  }

  it('get url by create mode', () => {
    const urls = [
      { value: 'albums/', expected: 'albums/' },
      { value: 'albums/:album_id/', expected: 'albums/100/' },
      { value: 'albums/:album_id/tracks/', expected: 'albums/100/tracks/' },
      { value: 'albums/:album_id/tracks/:id/', expected: 'albums/100/tracks/1/' },
      { value: '{{ albums/ | tracks/ }}', expected: 'albums/' },
      { value: '{{ albums/:album_id/ | tracks }}', expected: 'albums/100/' },
      { value: '{{ albums/:album_id/tracks/ | tracks/ }}', expected: 'albums/100/tracks/' },
      { value: '{{ albums/:album_id/tracks/:id/ | tracks/ }}', expected: 'albums/100/tracks/1/' },
    ]

    urls.forEach(({ value, expected }) => {
      const command = new ParseUrlCommand(value, FORM_MODE.create, trackRecord)
      const handler = new ParseUrlHandler()

      const url = handler.execute(command)
      expect(url).toBe(expected)
    })
  })

  it('get url by update mode', () => {
    const urls = [
      { value: 'tracks/', expected: 'tracks/' },
      { value: 'tracks/:id/', expected: 'tracks/1/' },
      { value: 'albums/:album_id/tracks/:id/', expected: 'albums/100/tracks/1/' },
      { value: '{{ albums/ | tracks/ }}', expected: 'tracks/' },
      { value: '{{ albums/ | tracks/:id/ }}', expected: 'tracks/1/' },
      { value: '{{ albums/ | albums/:album_id/tracks/:id/ }}', expected: 'albums/100/tracks/1/' },
    ]

    urls.forEach(({ value, expected }) => {
      const command = new ParseUrlCommand(value, FORM_MODE.update, trackRecord)
      const handler = new ParseUrlHandler()

      const url = handler.execute(command)
      expect(url).toBe(expected)
    })
  })

  it('get url when record is empty or null', () => {
    const urls = [
      { value: 'tracks/:id/', expected: 'id' },
      { value: 'albums/:album_id/', expected: 'album_id' },
      { value: '{{ albums/ | tracks/:id/ }}', expected: 'id' },
      { value: '{{ albums/ | albums/:album_id/tracks/:id/ }}', expected: 'album_id' },
    ]

    const urlsWithNoParam = 'tracks/'
    const command = new ParseUrlCommand(urlsWithNoParam, FORM_MODE.update, {})
    const handler = new ParseUrlHandler()

    const url = handler.execute(command)
    expect(url).toBe(urlsWithNoParam)

    urls.forEach(({ value, expected }) => {
      const command = new ParseUrlCommand(value, FORM_MODE.update, {})
      const handler = new ParseUrlHandler()

      expect(() => handler.execute(command)).toThrowError(`Param ${expected} is not found in the record`)
    })
  })
})
