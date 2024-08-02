import type { NormalizedSettings } from '@packages/core/forms/axioma'
import { DEFAULT_LOOKUP_FIELD, FORM_MODE } from '@packages/core/forms/axioma'
import { t } from '@packages/core/locales'
import type { INormalizeSettingsHandler, NormalizeSettingsCommand } from '../axioma'

export class NormalizeSettingsHandler implements INormalizeSettingsHandler {
  execute({ settings }: NormalizeSettingsCommand): NormalizedSettings {
    const _settings: NormalizedSettings = {
      url: settings?.url || '',
      mode: settings?.mode || FORM_MODE.create,
      lookupField: settings?.lookupField !== undefined ? settings.lookupField : DEFAULT_LOOKUP_FIELD,
      title: settings?.title ?? `{{ ${t('create-new-record')} | ${t('update-record')} }}`,
      loading: settings?.loading ?? false,
    }

    return _settings
  }
}
