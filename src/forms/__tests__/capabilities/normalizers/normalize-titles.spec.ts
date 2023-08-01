import { NormalizeTitlesHandler } from '@/forms/capabilities'

describe('NormalizeTitles', () => {
  let normalizeTitles: NormalizeTitlesHandler

  beforeEach(() => {
    normalizeTitles = new NormalizeTitlesHandler()
  })

  it('should normalize titles with default values when no titles are provided', () => {
    const normalized = normalizeTitles.execute()

    expect(normalized.create).toBeTypeOf('string')
    expect(normalized.update).toBeTypeOf('string')
  })

  it('should normalize titles by using the provided titles or default values', () => {
    const titles = {
      create: 'Create New',
      update: 'Update Existing',
    }
    const normalized = normalizeTitles.execute(titles)

    expect(normalized.create).toBe(titles.create)
    expect(normalized.update).toBe(titles.update)
  })

  it('should prioritize provided titles over default values', () => {
    const titles = {
      update: 'Update Now',
    }
    const normalized = normalizeTitles.execute(titles)

    expect(normalized.create).toBeTypeOf('string')
    expect(normalized.update).toBe(titles.update)
  })

  it('should handle empty titles', () => {
    const titles = {
      create: '',
      update: '',
    }
    const normalized = normalizeTitles.execute(titles)

    expect(normalized.create).toBe('')
    expect(normalized.update).toBe('')
  })
})
