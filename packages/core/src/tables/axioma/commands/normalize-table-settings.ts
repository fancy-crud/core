import type { NormalizedTableSettings, RawTableSettings } from '@packages/core/tables/axioma'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class NormalizeTableSettingsCommand<T extends RawTableSettings> implements BaseCommand {
  public readonly meta = meta(INormalizeTableSettingsHandler)

  constructor(
    public readonly rawSettings: T,
  ) {}
}

export abstract class INormalizeTableSettingsHandler implements BaseHandler {
  abstract execute<T extends RawTableSettings>({ rawSettings }: NormalizeTableSettingsCommand<T>): T & NormalizedTableSettings
}
