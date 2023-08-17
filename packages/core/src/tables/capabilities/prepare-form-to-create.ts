import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { inject, meta } from '@packages/core/common/bus/capabilities'
import { ISwitchFormToCreateModeHandler, SwitchFormToCreateModeCommand } from '@packages/core/forms/capabilities'

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
