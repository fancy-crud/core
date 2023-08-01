import { NormalizeTitlesCommand, NormalizeTitlesHandler } from '@/forms/capabilities'

describe('NormalizeTitles', () => {
  let normalizeTitles: NormalizeTitlesHandler

  beforeEach(() => {
    normalizeTitles = new NormalizeTitlesHandler()
  })

  it('should normalize titles with default values when no titles are provided', () => {
    const command = new NormalizeTitlesCommand()
    const normalized = normalizeTitles.execute(command)

    expect(normalized.create).toBeTypeOf('string')
    expect(normalized.update).toBeTypeOf('string')
  })

  it('should normalize titles by using the provided titles or default values', () => {
    const titles = {
      create: 'Create New',
      update: 'Update Existing',
    }
    const command = new NormalizeTitlesCommand(titles)
    const normalized = normalizeTitles.execute(command)

    expect(normalized.create).toBe(titles.create)
    expect(normalized.update).toBe(titles.update)
  })

  it('should prioritize provided titles over default values', () => {
    const titles = {
      update: 'Update Now',
    }
    const command = new NormalizeTitlesCommand(titles)
    const normalized = normalizeTitles.execute(command)

    expect(normalized.create).toBeTypeOf('string')
    expect(normalized.update).toBe(titles.update)
  })

  it('should handle empty titles', () => {
    const titles = {
      create: '',
      update: '',
    }

    const command = new NormalizeTitlesCommand(titles)
    const normalized = normalizeTitles.execute(command)

    expect(normalized.create).toBe('')
    expect(normalized.update).toBe('')
  })
})
