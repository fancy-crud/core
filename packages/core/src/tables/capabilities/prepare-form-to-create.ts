import { inject } from '@packages/core/common/bus/capabilities'
import { ISwitchFormToCreateModeHandler, SwitchFormToCreateModeCommand } from '@packages/core/forms/axioma'
import type { IPrepareFormToCreateHandler, PrepareFormToCreateCommand } from '../axioma'

export class PrepareFormToCreateHandler implements IPrepareFormToCreateHandler {
  constructor(
    private switchFormToCreateMode: ISwitchFormToCreateModeHandler = inject(ISwitchFormToCreateModeHandler),
  ) {}

  execute({ formId, options }: PrepareFormToCreateCommand): void {
    this.switchFormToCreateMode.execute(
      new SwitchFormToCreateModeCommand(formId, options),
    )
  }
}
