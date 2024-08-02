import type { INormalizeTableSettingsHandler, NormalizeTableSettingsCommand, NormalizedTableSettings, RawTableSettings } from '../axioma'

export class NormalizeTableSettingsHandler implements INormalizeTableSettingsHandler {
  execute<T extends RawTableSettings>({ rawSettings }: NormalizeTableSettingsCommand<T>): T & NormalizedTableSettings {
    const _settings = {
      lookupField: 'id',
      skipDeleteConfirmation: false,
      displayFormDialog: false,
      displayConfirmationDialog: false,
      autoInferColumns: true,
      rowToDelete: null,
      ...rawSettings,
    } as T & NormalizedTableSettings

    return _settings
  }
}
