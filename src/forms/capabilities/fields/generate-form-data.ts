import type { NormalizedField, NormalizedFields } from '@/forms/axioma'

/**
 * Class responsible for generating form data in the appropriate format.
 */
export class GenerateFormData {
  private jsonForm: Record<string, unknown> = {}
  private formData: FormData | null = null

  /**
   * Handles list values in the form.
   *
   * @param fieldKey The key of the field being handled.
   * @param field The field being handled.
   */
  private handleListValues(fieldKey: string, field: NormalizedField) {
    const formKey = field.modelKey || `${fieldKey}_id`

    const addFormDataValue = (value: any) => {
      const optionValue = String(field.optionValue)

      if (typeof value === 'object') {
        const formValue = value[optionValue]

        if (field.multiple) {
          if (!Array.isArray(this.jsonForm[formKey]))
            this.jsonForm[formKey] = [formValue]

          else
            (this.jsonForm[formKey] as Array<unknown>).push(formValue)
        }
        else {
          this.jsonForm[formKey] = formValue
        }
        return
      }

      if (field.multiple) {
        if (!Array.isArray(this.jsonForm[formKey]))
          this.jsonForm[formKey] = [value]

        else
          (this.jsonForm[formKey] as Array<unknown>).push(value)
      }
      else {
        this.jsonForm[formKey] = value
      }
    }

    if (!field.modelValue) {
      this.jsonForm[formKey] = field.modelValue
      return
    }

    if (field.multiple && Array.isArray(field.modelValue)) {
      field.modelValue.forEach(addFormDataValue)
      return
    }

    addFormDataValue(field.modelValue as any)
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
  private handleValue(fieldKey: string, field: NormalizedField) {
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
      if (field.url || field.optionValue) {
        this.handleListValues(fieldKey, field)
        return
      }

      const isFileOrImage = ['file', 'image'].includes(field.type)

      if (isFileOrImage && field.modelValue)
        this.handleFileValue(fieldKey, field)

      else
        this.handleValue(fieldKey, field)

      field.errors = []
    })

    return { jsonForm: this.jsonForm, formData: this.formData }
  }
}
