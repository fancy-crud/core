import { Bus, inject } from '@fancy-crud/bus'
import type { NormalizedField, SaveFormCommand, StandardErrorResponseStructure, StandardResponseStructure } from '../axioma'
import { DispatchOnFailedFormEventCommand, DispatchOnSuccessFormEventCommand, FilterFieldsByFormModeCommand, GenerateFormDataCommand, IFormStore } from '../axioma'
import { ParseUrlCommand, SaveRecordCommand } from '../../common/http/axioma'

export class SaveFormHandler {
  constructor(
    private formStore: IFormStore = inject(IFormStore),
    private bus: Bus = new Bus(),
  ) {}

  execute({ formId, options }: SaveFormCommand): void {
    const form = this.formStore.searchById(formId)!

    const filteredFields = this.bus.execute(
      new FilterFieldsByFormModeCommand(form.fields, form.settings.mode),
    ) as [string, NormalizedField][]

    const filteredFieldsAsObject = filteredFields.reduce((previous, [fieldKey, field]) => {
      if (field.exclude !== true)
        previous[fieldKey] = field
      return previous
    }, {} as Record<string, NormalizedField>)

    const { jsonForm, formData } = this.bus.execute(
      new GenerateFormDataCommand(filteredFieldsAsObject),
    )

    const { mode, lookupValue } = form.settings

    const url = this.bus.execute(
      new ParseUrlCommand(form.settings.url, mode, form.record.value),
    )
    const data = formData || jsonForm

    const onSuccess = (response?: StandardResponseStructure) => this.bus.execute(
      new DispatchOnSuccessFormEventCommand(formId, { response }),
    )

    const onFailed = (error?: StandardErrorResponseStructure) => this.bus.execute(
      new DispatchOnFailedFormEventCommand(formId, error),
    )

    this.bus.execute(
      new SaveRecordCommand(url, data, mode, lookupValue, {
        onInit() {
          if (form.buttons)
            form.buttons.main.isLoading = true
        },
        onSuccess,
        onFailed,
        onFinally() {
          if (form.buttons)
            form.buttons.main.isLoading = false
        },
        ...options,
      }),
    )
  }
}

