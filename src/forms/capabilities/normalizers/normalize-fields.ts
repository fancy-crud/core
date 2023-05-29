import type { NormalizedField, NormalizedFields, ObjectWithRawFields, RawField } from '@/forms/axioma'

/**
  A utility class that normalizes form fields by merging them with default keys and values.
  Provides a static execute method that takes an object containing form fields and returns
  a new object with normalized fields.
**/
export class NormalizeFormFields {
  /**
    Creates a new object with default keys and values for a form field, merging it with the provided field object.
    Assigns a unique id, modelKey, name, and other properties. If the field object has any properties
    that conflict with the default keys, the field object's properties will take precedence.
    @param {string} fieldKey - The unique key for the form field.
    @param {RawField} field - The form field object containing the properties to be merged with the default keys.
    @returns {NormalizedField & RawField} - A new object combining the default keys and values with the provided field object.
  **/
  private createDefaultKeys(fieldKey: string, field: RawField): NormalizedField {
    const _field: NormalizedField = Object.assign({}, {
      id: `field-${fieldKey}-control`,
      modelKey: fieldKey,
      name: fieldKey,
      errors: [],
      wasFocused: false,
      modelValue: field.multiple ? [] : null,
      showPassword: false,
      class: '',
      ref: null,
      ...field,
    })

    // if (_field.type === 'autocomplete')
    //   _field.valueString = ''

    if (_field.url && (!_field.options || !Array.isArray(_field.options)))
      _field.options = []

    const defaults = getDefaults()
    const fieldClasses = defaults.classes[_field.type] || ''
    _field.class = `${fieldClasses} ${_field.class}`.trim()

    return _field
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
        [fieldKey]: this.createDefaultKeys(fieldKey, field),
      }
    }, {} as NormalizedFields<T>)

    return normalizedFields
  }
}
