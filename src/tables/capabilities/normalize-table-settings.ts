import type { NormalizedTableSettings, RawTableSettings } from '@/tables/axioma'
import type { BaseCommand } from '@/common/bus/axioma'

export class NormalizeTableSettingsCommand<T extends RawTableSettings> implements BaseCommand {
  public readonly meta = meta(NormalizeTableSettingsHandler)

  constructor(
    public readonly rawSettings: T,
  ) {}
}

class NormalizeTableSettingsHandler {
  execute<T extends RawTableSettings>({ rawSettings }: NormalizeTableSettingsCommand<T>): T & NormalizedTableSettings {
    return rawSettings as T & NormalizedTableSettings
  }
}
