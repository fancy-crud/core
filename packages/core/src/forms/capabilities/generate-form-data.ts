import type { BaseObjectWithNormalizedFields } from '@packages/core/forms/axioma'
import type { GenerateFormDataCommand, GenerateFormDataOutput, IGenerateFormDataHandler, JsonForm, MinimumNormalizedField } from '../axioma'

export class GenerateFormDataHandler implements IGenerateFormDataHandler {
  private jsonForm: Record<string, any> = {}
  private formData: FormData | null = null

  /**
   * Handles list values in the form.
   *
   * @param fieldKey The key of the field being handled.
   * @param field The field being handled.
   */
  private handleListValues(fieldKey: string, field: MinimumNormalizedField) {
    const formKey = field.modelKey || `${fieldKey}_id`
    const multiple = Array.isArray(field.modelValue)

    const addFormDataValue = (value: any) => {
      const optionValue = String(field.optionValue || '')
      let parsedValue: any = value

      if (typeof parsedValue === 'object' && !Array.isArray(parsedValue))
        parsedValue = optionValue ? parsedValue[optionValue] : parsedValue

      let jsonFormValue: any = parsedValue

      if (multiple) {
        jsonFormValue = [...this.jsonForm[fieldKey]]
        jsonFormValue = Array.isArray(parsedValue) ? [...jsonFormValue, ...parsedValue] : [...jsonFormValue, parsedValue]
      }

      this.jsonForm[formKey] = jsonFormValue
    }

    this.jsonForm[fieldKey] = []
    ;(field.modelValue as unknown[]).forEach(addFormDataValue)
  }

  /**
   * Handles file values in the form.
   *
   * @param fieldKey The key of the field being handled.
   * @param field The field being handled.
   */
  private handleFileValue(fieldKey: string, field: MinimumNormalizedField) {
    const formKey = field.modelKey || fieldKey
    const parseModelValue = field.parseModelValue ? field.parseModelValue(field.modelValue) : field.modelValue

    if (!this.formData)
      this.formData = new FormData()

    if (Array.isArray(parseModelValue)) {
      if (field.multiple)
        parseModelValue.forEach((file: File) => this.formData?.append(formKey, file))

      else
        this.formData.set(formKey, parseModelValue[0])

      return
    }
    this.formData.set(formKey, parseModelValue as any)
  }

  /**
   * Handles values in the form that are not lists or files.
   *
   * @param fieldKey The key of the field being handled.
   * @param field The field being handled.
   */
  private handlePlainValue(fieldKey: string, field: MinimumNormalizedField) {
    const value: unknown = field.parseModelValue ? field.parseModelValue(field.modelValue) : field.modelValue

    this.jsonForm[field.modelKey || fieldKey] = value
  }

  private syncData() {
    if (!this.formData)
      return

    Object.entries(this.jsonForm).forEach(([key, value]) => {
      this.formData?.append(key, value ?? '')
    })
  }

  /**
   * Generates the form data in the appropriate format.
   *
   * @param fields The normalized form fields.
   * @returns An object containing the form data in the appropriate format.
   */
  execute<T extends BaseObjectWithNormalizedFields<MinimumNormalizedField>>({ fields }: GenerateFormDataCommand<T>): GenerateFormDataOutput<T> {
    const entriesFields: [string, MinimumNormalizedField][] = Object.entries(fields)

    entriesFields.forEach(([fieldKey, field]) => {
      const isFileOrImage = ['file', 'image'].includes(field.type)
      field.errors = []

      if (!isFileOrImage && field.parseModelValue) {
        this.handlePlainValue(fieldKey, field)
        return
      }

      if (!isFileOrImage && Array.isArray(field.modelValue)) {
        this.handleListValues(fieldKey, field)
        return
      }

      if (isFileOrImage && field.modelValue)
        this.handleFileValue(fieldKey, field)

      else
        this.handlePlainValue(fieldKey, field)
    })

    this.syncData()

    return { jsonForm: this.jsonForm as JsonForm<typeof fields>, formData: this.formData }
  }
}
