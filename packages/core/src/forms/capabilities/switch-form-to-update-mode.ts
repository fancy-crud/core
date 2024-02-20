import { FORM_MODE, IFormStore } from '@packages/core/forms/axioma'
import { inject } from '@fancy-crud/bus'
import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'
import type { ISwitchFormToUpdateModeHandler, SwitchFormToUpdateModeCommand, SwitchFormToUpdateModeCommandInput } from '../axioma'
import { IResetFieldsHandler, ResetFieldsCommand } from '../axioma'

export class SwitchFormToUpdateModeHandler implements ISwitchFormToUpdateModeHandler {
  constructor(
    private resetFields: IResetFieldsHandler = inject(IResetFieldsHandler),
    private formStore: Pick<IFormStore, 'searchById'> = inject(IFormStore),
  ) {}

  private getForm(formOrId: SwitchFormToUpdateModeCommandInput) {
    if (typeof formOrId === 'symbol') {
      const state = this.formStore.searchById(formOrId)

      if (!state)
        throw new StoreStateDoesNotExist(formOrId)

      return state
    }

    return formOrId
  }

  execute(command: SwitchFormToUpdateModeCommand): void {
    const { formOrId, options } = command
    const form = this.getForm(formOrId)

    if (typeof form.buttons.aux.onClick !== 'function' && options?.onClickAux)
      Object.assign(form.buttons.aux, { onClick: options.onClickAux })

    this.resetFields.execute(
      new ResetFieldsCommand(form.fields, form.originalNormalizedFields),
    )

    form.settings.mode = FORM_MODE.update
  }
}
