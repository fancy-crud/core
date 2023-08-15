import { IFormStore } from '../axioma'
import { IResetFieldsHandler } from './reset-fields'
import type { BaseCommand } from '@/common/bus/axioma'
import type { NormalizedSettings, ObjectWithNormalizedButtons, ObjectWithNormalizedFields } from '@/forms/axioma'

export type SwitchFormToCreateModeCommandInput = symbol | {
  originalNormalizedFields: ObjectWithNormalizedFields
  fields: ObjectWithNormalizedFields
  buttons: ObjectWithNormalizedButtons
  settings: NormalizedSettings
}

export class SwitchFormToCreateModeCommand implements BaseCommand {
  public readonly meta = meta(SwitchFormToCreateModeHandler)

  constructor(
    public readonly formOrId: SwitchFormToCreateModeCommandInput,
    public readonly options?: { onClickAux?: () => void },
  ) {}
}

export abstract class ISwitchFormToCreateModeHandler {
  abstract execute(command: SwitchFormToCreateModeCommand): void
}

class SwitchFormToCreateModeHandler implements ISwitchFormToCreateModeHandler {
  constructor(
    private resetFields: IResetFieldsHandler = inject(IResetFieldsHandler),
    private formStore: Pick<IFormStore, 'searchById'> = inject(IFormStore),
  ) {}

  private getForm(formOrId: SwitchFormToCreateModeCommandInput) {
    if (typeof formOrId === 'symbol') {
      const state = this.formStore.searchById(formOrId)

      if (!state)
        throw new StoreStateDoesNotExist(formOrId)

      return state
    }

    return formOrId
  }

  execute(command: SwitchFormToCreateModeCommand): void {
    const { formOrId, options } = command
    const form = this.getForm(formOrId)

    if (typeof form.buttons.aux.onClick !== 'function' && options?.onClickAux)
      Object.assign(form.buttons.aux, { onClick: options.onClickAux })

    this.resetFields.execute(
      new ResetFieldsCommand(form.fields, form.originalNormalizedFields),
    )

    form.settings.mode = FORM_MODE.create
  }
}

injectable(ISwitchFormToCreateModeHandler.name, SwitchFormToCreateModeHandler)
