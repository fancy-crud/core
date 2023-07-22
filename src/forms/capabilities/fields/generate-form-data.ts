import type { NormalizedField, NormalizedFields } from '@/forms/axioma'

/**
 * Class responsible for generating form data in the appropriate format.
 */
export class GenerateFormData {
  private jsonForm: Record<string, any> = {}
  private formData: FormData | null = null

  /**
   * Handles list values in the form.
   *
   * @param fieldKey The key of the field being handled.
   * @param field The field being handled.
   */
  private handleListValues(fieldKey: string, field: NormalizedField) {
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
  private handleFileValue(fieldKey: string, field: NormalizedField) {
    const formKey = field.modelKey || fieldKey

    if (!this.formData)
      this.formData = new FormData()

    if (Array.isArray(field.modelValue)) {
      if (field.multiple)
        field.modelValue.forEach((file: File) => this.formData?.append(formKey, file))

      else
        this.formData.set(formKey, field.modelValue[0])

      return
    }
    this.formData.set(formKey, field.modelValue as any)
  }

  /**
   * Handles values in the form that are not lists or files.
   *
   * @param fieldKey The key of the field being handled.
   * @param field The field being handled.
   */
  private handlePlainValue(fieldKey: string, field: NormalizedField) {
    const value: unknown = field.modelValue
    this.jsonForm[field.modelKey || fieldKey] = value
  }

  /**
   * Generates the form data in the appropriate format.
   *
   * @param fields The normalized form fields.
   * @returns An object containing the form data in the appropriate format.
   */
  execute<T = object>(fields: NormalizedFields<T>) {
    const entriesFields: [string, NormalizedField][] = Object.entries(fields)

    entriesFields.forEach(([fieldKey, field]) => {
      const isFileOrImage = ['file', 'image'].includes(field.type)

      if (Array.isArray(field.modelValue) && !isFileOrImage) {
        this.handleListValues(fieldKey, field)
        return
      }

      if (isFileOrImage && field.modelValue)
        this.handleFileValue(fieldKey, field)

      else
        this.handlePlainValue(fieldKey, field)

      field.errors = []
    })

    return { jsonForm: this.jsonForm, formData: this.formData }
  }
}
