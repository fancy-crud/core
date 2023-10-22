import { meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedSettings, ObjectWithNormalizedButtons, BaseObjectWithNormalizedFields } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'

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

export abstract class ISwitchFormToUpdateModeHandler {
  abstract execute(command: SwitchFormToUpdateModeCommand): void
}
