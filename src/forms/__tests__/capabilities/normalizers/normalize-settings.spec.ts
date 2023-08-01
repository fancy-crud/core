import { NormalizeSettingsCommand, NormalizeSettingsHandler } from '@/forms/capabilities'
import { DEFAULT_LOOKUP_FIELD, FORM_MODE } from '@/forms/axioma'

describe('NormalizeSettings', () => {
  let normalizeSettings: NormalizeSettingsHandler

  beforeEach(() => {
    normalizeSettings = new NormalizeSettingsHandler()
  })

  it('should normalize settings with default values when no settings are provided', () => {
    const command = new NormalizeSettingsCommand()
    const normalized = normalizeSettings.execute(command)

    expect(normalized.url).toBe('')
    expect(normalized.mode).toBe(FORM_MODE.create)
    expect(normalized.lookupField).toBe(DEFAULT_LOOKUP_FIELD)
  })

  it('should normalize settings by merging provided settings with default values', () => {
    const settings = {
      url: 'https://example.com',
      mode: FORM_MODE.update,
    }

    const command = new NormalizeSettingsCommand(settings)
    const normalized = normalizeSettings.execute(command)

    expect(normalized.url).toBe(settings.url)
    expect(normalized.mode).toBe(settings.mode)
    expect(normalized.lookupField).toBe(DEFAULT_LOOKUP_FIELD)
  })

  it('should prioritize provided settings over default values', () => {
    const settings = {
      url: 'https://example.com',
      lookupField: 'id',
    }

    const command = new NormalizeSettingsCommand(settings)
    const normalized = normalizeSettings.execute(command)

    expect(normalized.url).toBe(settings.url)
    expect(normalized.mode).toBe(FORM_MODE.create)
    expect(normalized.lookupField).toBe(settings.lookupField)
  })
})
