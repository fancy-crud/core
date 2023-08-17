import { FORM_MODE, type FormMode, type NormalizedTitles } from '@packages/core/forms/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'

export class GetTitleByFormModeCommand implements BaseCommand {
  public readonly meta = meta(GetTitleByFomModeHandler)

  constructor(
    public readonly mode: FormMode,
    public readonly titles: NormalizedTitles,
  ) {}
}

class GetTitleByFomModeHandler {
  execute({ mode, titles }: GetTitleByFormModeCommand) {
    return mode === FORM_MODE.create ? titles.create : titles.update
  }
}
