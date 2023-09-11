import type { FormMode, NormalizedButton } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class GetButtonLabelByFormModeCommand implements BaseCommand {
  public readonly meta = meta(IGetButtonLabelByFormModeHandler)

  constructor(
    public readonly mode: FormMode,
    public readonly button: NormalizedButton,
  ) {}
}

export abstract class IGetButtonLabelByFormModeHandler {
  abstract execute({ mode, button }: GetButtonLabelByFormModeCommand): string
}
