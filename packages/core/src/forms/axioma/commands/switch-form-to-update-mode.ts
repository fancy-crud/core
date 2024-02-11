import { meta } from '@fancy-crud/bus'
import type { BaseObjectWithNormalizedFields, NormalizedSettings, ObjectWithNormalizedButtons } from '@packages/core/forms/axioma'
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'

export type SwitchFormToUpdateModeCommandInput = symbol | {
  originalNormalizedFields: BaseObjectWithNormalizedFields
  fields: BaseObjectWithNormalizedFields
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
}

export class SwitchFormToUpdateModeCommand implements BaseCommand {
  public readonly meta = meta(ISwitchFormToUpdateModeHandler)

  constructor(
    public readonly formOrId: SwitchFormToUpdateModeCommandInput,
    public readonly options?: { onClickAux?: () => void },
  ) {}
}

export abstract class ISwitchFormToUpdateModeHandler implements BaseHandler {
  abstract execute(command: SwitchFormToUpdateModeCommand): void
}
