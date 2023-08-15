import type { FormMode, NormalizedButton } from '@/forms/axioma'
import type { BaseCommand } from '@/common/bus/axioma'

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
