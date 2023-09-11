import { FORM_MODE } from '@packages/core/forms/axioma'
import type { GetButtonLabelByFormModeCommand, IGetButtonLabelByFormModeHandler } from '../axioma'

export class GetButtonLabelByFormModeHandler implements IGetButtonLabelByFormModeHandler {
  execute({ mode, button }: GetButtonLabelByFormModeCommand): string {
    return mode === FORM_MODE.create ? button.label.create : button.label.update
  }
}
