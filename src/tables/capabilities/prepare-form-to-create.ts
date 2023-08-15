import type { BaseCommand } from '@/common/bus/axioma'
import { ISwitchFormToCreateModeHandler } from '@/forms/capabilities'

export class PrepareFormToCreateCommand implements BaseCommand {
  public readonly meta = meta(PrepareFormToCreateHandler)

  constructor(
    public readonly formId: symbol,
    public readonly options?: { onClickAux?: () => void },
  ) {}
}

class PrepareFormToCreateHandler {
  constructor(
    private switchFormToCreateMode: ISwitchFormToCreateModeHandler = inject(ISwitchFormToCreateModeHandler),
  ) {}

  execute({ formId, options }: PrepareFormToCreateCommand): void {
    this.switchFormToCreateMode.execute(
      new SwitchFormToCreateModeCommand(formId, options),
    )
  }
}
