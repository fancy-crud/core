import type { FormMode, NormalizedTitles } from '@/forms/axioma'
import type { BaseCommand } from '@/common/bus/axioma'

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
