import '@packages/core/forms/integration/load-commands'
import { NormalizeTitlesCommand } from '@packages/core/forms/axioma'
import { describe, expect, it } from 'vitest'

describe('NormalizeTitles', () => {
  it.concurrent('should normalize titles with default values when no titles are provided', () => {
    const command = new NormalizeTitlesCommand()
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.create).toBeTypeOf('string')
    expect(normalized.update).toBeTypeOf('string')
  })

  it.concurrent('should normalize titles by using the provided titles or default values', () => {
    const titles = {
      create: 'Create New',
      update: 'Update Existing',
    }
    const command = new NormalizeTitlesCommand(titles)
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.create).toBe(titles.create)
    expect(normalized.update).toBe(titles.update)
  })

  it.concurrent('should prioritize provided titles over default values', () => {
    const titles = {
      update: 'Update Now',
    }
    const command = new NormalizeTitlesCommand(titles)
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.create).toBeTypeOf('string')
    expect(normalized.update).toBe(titles.update)
  })

  it.concurrent('should handle empty titles', () => {
    const titles = {
      create: '',
      update: '',
    }

    const command = new NormalizeTitlesCommand(titles)
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.create).toBe('')
    expect(normalized.update).toBe('')
  })
})
