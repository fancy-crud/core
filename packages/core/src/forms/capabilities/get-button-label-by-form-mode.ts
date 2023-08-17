import { FORM_MODE, type FormMode, type NormalizedButton } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class GetButtonLabelByFormModeCommand implements BaseCommand {
  public readonly meta = meta(GetButtonLabelByFormModeHandler)

  constructor(
    public readonly mode: FormMode,
    public readonly button: NormalizedButton,
  ) {}
}

class GetButtonLabelByFormModeHandler {
  execute({ mode, button }: GetButtonLabelByFormModeCommand) {
    return mode === FORM_MODE.create ? button.label.create : button.label.update
  }
}
