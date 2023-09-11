import { FORM_MODE } from '@packages/core/forms/axioma'
import type { GetTitleByFormModeCommand, IGetTitleByFomModeHandler } from '../axioma'

export class GetTitleByFomModeHandler implements IGetTitleByFomModeHandler {
  execute({ mode, titles }: GetTitleByFormModeCommand) {
    return mode === FORM_MODE.create ? titles.create : titles.update
  }
}
