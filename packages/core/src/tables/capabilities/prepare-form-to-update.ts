import type { Row } from '@packages/core/tables/axioma'
import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { ISetFieldsValuesHandler, ISwitchFormToUpdateModeHandler, SetFieldsValuesCommand, SwitchFormToUpdateModeCommand } from '@packages/core/forms/capabilities'
import { IRequestRetrieveHandler, RequestRetrieveCommand } from '@packages/core/common/http/capabilities'
import { IFormStore } from '@packages/core/forms/axioma'
import { inject, meta } from '@packages/core/common/bus/capabilities'
import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'

export class PrepareFormToUpdateCommand implements BaseCommand {
  public readonly meta = meta(PrepareFormToUpdateHandler)

  constructor(
    public readonly formId: symbol,
    public readonly row: Row,
    public readonly tableSettings: { url: string; lookupField: string },
    public readonly options?: { onClickAux?: () => void; onReady?: () => void },
  ) {}
}

class PrepareFormToUpdateHandler {
  constructor(
    private switchFormToUpdateMode: ISwitchFormToUpdateModeHandler = inject(ISwitchFormToUpdateModeHandler),
    private setFieldsValues: ISetFieldsValuesHandler = inject(ISetFieldsValuesHandler),
    private requestRetrieve: IRequestRetrieveHandler = inject(IRequestRetrieveHandler),
    private formStore: IFormStore = inject(IFormStore),
  ) {}

  execute({ formId, options, tableSettings, row }: PrepareFormToUpdateCommand): void {
    const form = this.formStore.searchById(formId)

    if (!form)
      throw new StoreStateDoesNotExist(formId)

    this.switchFormToUpdateMode.execute(
      new SwitchFormToUpdateModeCommand(form, options),
    )

    type rowKey = keyof typeof row
    const lookupField = (tableSettings.lookupField || form.settings.lookupField) as rowKey
    let lookupValue = ''

    if (Object.prototype.hasOwnProperty.call(row, lookupField))
      lookupValue = String(row[lookupField])

    const setFieldsValues = this.setFieldsValues
    const requestRetrieveCommand = new RequestRetrieveCommand(tableSettings.url, lookupValue, {
      onSuccess(response: { data: Record<string, unknown> }) {
        setFieldsValues.execute(
          new SetFieldsValuesCommand(form.fields, form.settings, response.data || {}),
        )

        if (options?.onReady)
          options.onReady()
      },
    })

    this.requestRetrieve.execute(requestRetrieveCommand)
  }
}
