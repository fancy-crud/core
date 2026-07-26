import { meta } from '@fancy-crud/bus'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import type { NormalizedSettings, RawSetting } from '@packages/core/forms/axioma'

export class NormalizeSettingsCommand implements BaseCommand {
  public readonly meta = meta(INormalizeSettingsHandler)

  constructor(
    public readonly settings?: RawSetting,
  ) {}
}
export abstract class INormalizeSettingsHandler implements BaseHandler {
  abstract execute({ settings }: NormalizeSettingsCommand): NormalizedSettings
}
