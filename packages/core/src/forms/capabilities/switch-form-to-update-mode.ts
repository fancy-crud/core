import { FORM_MODE, IFormStore } from '@packages/core/forms/axioma'
import { inject, injectable, meta } from '@packages/core/common/bus/capabilities'
import type { NormalizedSettings, ObjectWithNormalizedButtons, ObjectWithNormalizedFields } from '@packages/core/forms/axioma'
import { IResetFieldsHandler, ResetFieldsCommand } from '@packages/core/forms/capabilities'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'

export type SwitchFormToUpdateModeCommandInput = symbol | {
  originalNormalizedFields: ObjectWithNormalizedFields
  fields: ObjectWithNormalizedFields
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
}

export class SwitchFormToUpdateModeCommand implements BaseCommand {
  public readonly meta = meta(SwitchFormToUpdateModeHandler)

  constructor(
    public readonly formOrId: SwitchFormToUpdateModeCommandInput,
    public readonly options?: { onClickAux?: () => void },
  ) {}
}

export abstract class ISwitchFormToUpdateModeHandler {
  abstract execute(command: SwitchFormToUpdateModeCommand): void
}

class SwitchFormToUpdateModeHandler implements ISwitchFormToUpdateModeHandler {
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

injectable(ISwitchFormToUpdateModeHandler.name, SwitchFormToUpdateModeHandler)
