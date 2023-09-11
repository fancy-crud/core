import type { INormalizeTableSettingsHandler, NormalizeTableSettingsCommand, NormalizedTableSettings, RawTableSettings } from '../axioma'

export class NormalizeTableSettingsHandler implements INormalizeTableSettingsHandler {
  execute<T extends RawTableSettings>({ rawSettings }: NormalizeTableSettingsCommand<T>): T & NormalizedTableSettings {
    return rawSettings as T & NormalizedTableSettings
  }
}
