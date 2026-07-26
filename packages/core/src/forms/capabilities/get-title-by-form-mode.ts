import { FORM_MODE } from '@packages/core/forms/axioma'
import { matchText } from '@packages/core/common/helpers'
import type { GetTitleByFormModeCommand, IGetTitleByFomModeHandler } from '../axioma'

export class GetTitleByFomModeHandler implements IGetTitleByFomModeHandler {
  execute({ mode, text }: GetTitleByFormModeCommand) {
    const titles = matchText(text)
    return mode === FORM_MODE.create ? titles.left : titles.right
  }
}
