import { ValidateForm } from '@/forms/capabilities'

describe('ValidateForm', () => {
  let validateForm: ValidateForm

  beforeEach(() => {
    const mockValidateFieldInstance: any = {
      execute: (field: { rules: () => true | string }) => field.rules(),
    }

    validateForm = new ValidateForm(mockValidateFieldInstance)
  })

  it('should return true if all fields are valid', () => {
    const fields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: 'John',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
        rules: () => true,
      },
      lastName: {
        id: 'field-lastName-control',
        modelKey: 'lastName',
        name: 'lastName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: 'Doe',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
        rules: () => true,
      },
    }

    const result = validateForm.execute(fields)

    expect(result).toBe(true)
  })

  it('should return false if any field is invalid', () => {
    const fields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: 'John',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
        rules: () => true,
      },
      lastName: {
        id: 'field-lastName-control',
        modelKey: 'lastName',
        name: 'lastName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
        rules: () => 'Last name is required',
      },
    }

    const result = validateForm.execute(fields)

    expect(result).toBe(false)
  })

  it('should pass options to validateField', () => {
    const fields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: 'John',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
        rules: () => true,
      },
      lastName: {
        id: 'field-lastName-control',
        modelKey: 'lastName',
        name: 'lastName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
        rules: () => 'Last name is required',
      },
    }

    const options = {
      processResult: (result: any) => {
        return result
      },
    }

    const result = validateForm.execute(fields, options)

    expect(result).toBe(false)
  })
})
