import { IFormStore, ISetFieldsValuesHandler, ISwitchFormToUpdateModeHandler, SetFieldsValuesCommand, SwitchFormToUpdateModeCommand } from '@packages/core/forms/axioma'
import { IHttp, IRequestRetrieveHandler, RequestRetrieveCommand } from '@packages/core/common/http/axioma'
import { inject } from '@fancy-crud/bus'
import { StoreStateDoesNotExist } from '@packages/core/common/store/axioma'
import type { IPrepareFormToUpdateHandler, PrepareFormToUpdateCommand } from '../axioma'

export class PrepareFormToUpdateHandler implements IPrepareFormToUpdateHandler {
  constructor(
    private switchFormToUpdateMode: ISwitchFormToUpdateModeHandler = inject(ISwitchFormToUpdateModeHandler),
    private setFieldsValues: ISetFieldsValuesHandler = inject(ISetFieldsValuesHandler),
    private requestRetrieve: IRequestRetrieveHandler = inject(IRequestRetrieveHandler),
    private formStore: IFormStore = inject(IFormStore),
    private httpService: IHttp = inject(IHttp),
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

    const onRetrieve = this.httpService.hooks.onRetrieve
    const requestRetrieveCommand = new RequestRetrieveCommand(tableSettings.url, lookupValue, {
      onSuccess(response: { data: Record<string, unknown> }) {
        const data: any = typeof onRetrieve === 'function' ? onRetrieve(response) : response.data

        setFieldsValues.execute(
          new SetFieldsValuesCommand(form.fields, form.settings, data || {}),
        )

        if (options?.onReady)
          options.onReady()
      },
    })

    this.requestRetrieve.execute(requestRetrieveCommand)
  }
}
