import type { NormalizedSettings } from '@packages/core/forms/axioma'
import { DEFAULT_LOOKUP_FIELD, FORM_MODE } from '@packages/core/forms/axioma'
import { t } from '@packages/core/locales'
import type { INormalizeSettingsHandler, NormalizeSettingsCommand } from '../axioma'

/**
 * A utility class that normalizes form settings configurations by merging them with default properties.
 * Provides an `execute` method that takes an optional object containing settings configurations
 * and returns a new object with normalized settings properties.
 */
export class NormalizeSettingsHandler implements INormalizeSettingsHandler {
  /**
   * Normalizes an optional object containing settings configurations by merging each configuration
   * with the default properties. Returns a new object with normalized settings properties.
   *
   * @param {RawSetting} settings - An optional object containing settings configurations to be normalized.
   * @returns {NormalizedSettings} - A new object with the normalized settings properties.
   */
  execute({ settings }: NormalizeSettingsCommand): NormalizedSettings {
    const _settings: NormalizedSettings = {
      url: settings?.url || '',
      mode: settings?.mode || FORM_MODE.create,
      lookupField: settings?.lookupField || DEFAULT_LOOKUP_FIELD,
      title: settings?.title ?? `{{ ${t('create-new-record')} | ${t('update-record')} }}`,
      loading: settings?.loading || false,
    }

    return _settings
  }
}
