import type { BaseRawField, NormalizedField, NormalizedFields, ObjectWithRawFields } from '@/forms/axioma'

/**
  A utility class that normalizes form fields by merging them with default keys and values.
  Provides a static execute method that takes an object containing form fields and returns
  a new object with normalized fields.
**/
export class NormalizeFormFields {
  private getDefaultNormalizedField<T extends NormalizedField>(obj: T): NormalizedField & T {
    const field: NormalizedField & T = Object.assign({}, obj)

    return field
  }

  /**
    Creates a new object with default keys and values for a form field, merging it with the provided field object.
    Assigns a unique id, modelKey, name, and other properties. If the field object has any properties
    that conflict with the default keys, the field object's properties will take precedence.
    @param {string} fieldKey - The unique key for the form field.
    @param {BaseRawField} field - The form field object containing the properties to be merged with the default keys.
    @returns {NormalizedField & BaseRawField} - A new object combining the default keys and values with the provided field object.
  **/
  private createDefaultKeys(fieldKey: string, rawField: BaseRawField): NormalizedField {
    const defaults = getDefaults()

    const field = this.getDefaultNormalizedField({
      id: `field-${fieldKey}-control`,
      modelKey: fieldKey,
      name: fieldKey,
      errors: [],
      recordValue: (value: any) => value[fieldKey],
      wasFocused: false,
      modelValue: rawField.multiple ? [] : null,
      class: '',
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

  /**
    Normalizes an object containing form fields by merging each field with the default keys and values.
    Returns a new object with normalized fields.
    @template T - A generic type for the form fields object.
    @param {T} fields - An object containing form fields to be normalized.
    @returns {NormalizedFields<T>} - A new object with the normalized form fields.
  **/
  execute<T extends ObjectWithRawFields = {}>(fields: T): NormalizedFields<T> {
    const normalizedFields = Object.entries(fields).reduce((previousValue, [fieldKey, field]) => {
      return {
        ...previousValue,
        [fieldKey]: this.createDefaultKeys(field.modelKey || fieldKey, field),
      }
    }, {} as NormalizedFields<T>)

    return normalizedFields
  }
}
