import type { ISetListDataHandler, NormalizedColumn, SetListDataCommand } from '@fancy-crud/core'
import { Bus, FORM_MODE, HttpService, IFormStore, ITableStore, PaginateResult, SetFieldsValuesCommand, injecting } from '@fancy-crud/core'
import type { ObjectWithRawFields } from '../..'
import { useForm } from '../../forms'

export class SetListDataWithReactivityFormsHandler implements ISetListDataHandler {
  constructor(
    private tableStore: ITableStore = injecting(ITableStore),
    private formStore: IFormStore = injecting(IFormStore),
  ) {}

  execute({ tableId, data }: SetListDataCommand): void {
    const bus = new Bus()
    const table = this.tableStore.searchById(tableId)!
    const form = this.formStore.searchById(table.formId)!

    let items: any[] = []
    let count = 0

    if (Array.isArray(data)) {
      items = data
      count = data.length
    }
    else {
      const httpService = new HttpService()
      const paginateResults = new PaginateResult(httpService.pagination, data)
      items = paginateResults.results
      count = paginateResults.count
    }

    const allowInputColumns = Object
      .entries<NormalizedColumn>(table.columns)
      .filter(([_, column]) => column.input.isEnable)

    const allowInputFields = allowInputColumns.reduce((acc, [columnName, column]) => {
      const field = column.input

      acc[columnName] = {
        ...field,
        label: '',
      }
      return acc
    }, {} as ObjectWithRawFields)

    const settings = form?.settings ?? table?.settings ?? {}

    items = items.map((record: any) => {
      const $form = useForm({
        fields: allowInputFields,
        settings: {
          ...settings,
          mode: FORM_MODE.update,
          lookupValue: record[settings.lookupField],
        },
      })

      bus.execute(
        new SetFieldsValuesCommand($form.fields, $form.settings, record),
      )

      Object.entries($form.fields).forEach(([_, field]) => {
        watch(() => field.modelValue, () => {
          if ($form.buttons.main.onClick)
            $form.buttons.main.onClick()
        })
      })

      return {
        ...record,
        $form,
      }
    })
    table.list.data = items
    table.pagination.count = count
  }
}
