import { NormalizeSettingsHandler } from '@/forms/capabilities'
import { DEFAULT_LOOKUP_FIELD, FormMode } from '@/forms/axioma'

describe('NormalizeSettings', () => {
  let normalizeSettings: NormalizeSettingsHandler

  beforeEach(() => {
    normalizeSettings = new NormalizeSettingsHandler()
  })

  it('should normalize settings with default values when no settings are provided', () => {
    const normalized = normalizeSettings.execute()

    expect(normalized.url).toBe('')
    expect(normalized.mode).toBe(FormModes.CREATE_MODE)
    expect(normalized.lookupField).toBe(DEFAULT_LOOKUP_FIELD)
  })

  it('should normalize settings by merging provided settings with default values', () => {
    const settings = {
      url: 'https://example.com',
      mode: FormModes.UPDATE_MODE,
    }
    const normalized = normalizeSettings.execute(settings)

    expect(normalized.url).toBe(settings.url)
    expect(normalized.mode).toBe(settings.mode)
    expect(normalized.lookupField).toBe(DEFAULT_LOOKUP_FIELD)
  })

  it('should prioritize provided settings over default values', () => {
    const settings = {
      url: 'https://example.com',
      lookupField: 'id',
    }
    const normalized = normalizeSettings.execute(settings)

    expect(normalized.url).toBe(settings.url)
    expect(normalized.mode).toBe(FormModes.CREATE_MODE)
    expect(normalized.lookupField).toBe(settings.lookupField)
  })
})
