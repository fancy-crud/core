import { inject } from '@fancy-crud/bus'
import { IFormStore, ISwitchFormToCreateModeHandler, SwitchFormToCreateModeCommand } from '@packages/core/forms/axioma'
import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'
import type { IPrepareFormToCreateHandler, PrepareFormToCreateCommand } from '../axioma'

export class PrepareFormToCreateHandler implements IPrepareFormToCreateHandler {
  constructor(
    private switchFormToCreateMode: ISwitchFormToCreateModeHandler = inject(ISwitchFormToCreateModeHandler),
    private formStore: IFormStore = inject(IFormStore),
  ) {}

  execute({ formId, options }: PrepareFormToCreateCommand): void {
    const form = this.formStore.searchById(formId)

    if (!form)
      throw new StoreStateDoesNotExist(formId)

    form.settings.loading = false

    this.switchFormToCreateMode.execute(
      new SwitchFormToCreateModeCommand(formId, options),
    )
  }
}
