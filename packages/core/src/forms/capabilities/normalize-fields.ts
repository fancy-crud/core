import type { BaseRawField, NormalizedField, NormalizedFields } from '@packages/core/forms/axioma'
import { getDefaults } from '@packages/core/config'
import { IHttp, PaginateResult } from '@packages/core/common/http/axioma'
import { inject } from '@fancy-crud/bus'
import type { INormalizeFormFieldsHandler, NormalizeFormFieldsCommand, NormalizeFormFieldsCommandInputType } from '../axioma'

export class NormalizeFormFieldsHandler implements INormalizeFormFieldsHandler {
  constructor(private http: Pick<IHttp, 'pagination'> = inject(IHttp)) {}
  private getDefaultNormalizedField<T extends NormalizedField>(obj: T): NormalizedField & T {
    const field: NormalizedField & T = Object.assign({}, obj)

    return field
  }

  private createDefaultKeys(fieldKey: string, rawField: BaseRawField): NormalizedField {
    const defaults = getDefaults()

    const field = this.getDefaultNormalizedField({
      id: `field-${fieldKey}-control`,
      modelKey: fieldKey,
      name: fieldKey,
      errors: [],
      wasFocused: false,
      modelValue: rawField.multiple ? [] : null,
      class: '',
      recordValue: (value: any) => value[fieldKey],
      interceptOptions: (options: any[]) => {
        if (Array.isArray(options)) {
          return options
        }
        else {
          const paginateResults = new PaginateResult(this.http.pagination, options)
          return paginateResults.results
        }
      },
      debounceTime: 0,
      wrapper: {
        class: '',
      },
      ref: null,
      ...rawField,
    })

    const fieldDefaults = defaults[field.type]
    field.class = `${fieldDefaults?.class || ''} ${field.class}`.trim()
    field.wrapper.class = `${fieldDefaults?.wrapper?.class || ''} ${field.wrapper.class}`.trim()

    if (field.url && (!field.options || !Array.isArray(field.options)))
      field.options = []

    return field
  }

  execute<T extends NormalizeFormFieldsCommandInputType = {}>({ fields }: NormalizeFormFieldsCommand<T>): NormalizedFields<T> {
    const normalizedFields = Object.entries(fields).reduce((previousValue, [fieldKey, field]) => {
      return {
        ...previousValue,
        [fieldKey]: this.createDefaultKeys(field.modelKey || fieldKey, field),
      }
    }, {} as NormalizedFields<T>)

    return normalizedFields
  }
}
