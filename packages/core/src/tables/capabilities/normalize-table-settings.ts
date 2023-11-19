import type { INormalizeTableSettingsHandler, NormalizeTableSettingsCommand, NormalizedTableSettings, RawTableSettings } from '../axioma'

export class NormalizeTableSettingsHandler implements INormalizeTableSettingsHandler {
  execute<T extends RawTableSettings>({ rawSettings }: NormalizeTableSettingsCommand<T>): T & NormalizedTableSettings {
    const _settings = {
      lookupField: rawSettings?.lookupField || 'id',
    } as T & NormalizedTableSettings

    return _settings
  }
}
