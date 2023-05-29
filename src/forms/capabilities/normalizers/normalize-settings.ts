import type { NormalizedSettings, RawSetting } from '@/forms/axioma'
import { DEFAULT_LOOKUP_FIELD, FormModes } from '@/forms/axioma'

/**
 * A utility class that normalizes form settings configurations by merging them with default properties.
 * Provides an `execute` method that takes an optional object containing settings configurations
 * and returns a new object with normalized settings properties.
 */
export class NormalizeSettings {
  /**
   * Normalizes an optional object containing settings configurations by merging each configuration
   * with the default properties. Returns a new object with normalized settings properties.
   *
   * @param {RawSetting} settings - An optional object containing settings configurations to be normalized.
   * @returns {NormalizedSettings} - A new object with the normalized settings properties.
   */
  execute(settings?: RawSetting): NormalizedSettings {
    const _settings: NormalizedSettings = {
      url: settings?.url || '',
      mode: settings?.mode || FormModes.CREATE_MODE,
      lookupField: settings?.lookupField || DEFAULT_LOOKUP_FIELD,
    }

    return _settings
  }
}
