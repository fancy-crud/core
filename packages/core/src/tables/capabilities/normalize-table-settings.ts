import type { NormalizedTableSettings, RawTableSettings } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

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