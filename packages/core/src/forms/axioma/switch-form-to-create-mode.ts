import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseObjectWithNormalizedFields, NormalizedSettings, ObjectWithNormalizedButtons } from '@packages/core/forms/axioma'

export type SwitchFormToCreateModeCommandInput = symbol | {
  originalNormalizedFields: BaseObjectWithNormalizedFields
  fields: BaseObjectWithNormalizedFields
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
}

export class SwitchFormToCreateModeCommand implements BaseCommand {
  public readonly meta = meta(ISwitchFormToCreateModeHandler)

  constructor(
    public readonly formOrId: SwitchFormToCreateModeCommandInput,
    public readonly options?: { onClickAux?: () => void },
  ) {}
}

export abstract class ISwitchFormToCreateModeHandler {
  abstract execute(command: SwitchFormToCreateModeCommand): void
}
