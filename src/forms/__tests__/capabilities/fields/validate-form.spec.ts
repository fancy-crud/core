import { ValidateFormCommand, ValidateFormHandler } from '@/forms/capabilities'

describe('ValidateForm', () => {
  let validateForm: ValidateFormHandler

  beforeEach(() => {
    const mockValidateFieldInstance: any = {
      execute: ({ field }: { field: { rules: () => true | string } }) => {
        if (field.rules)
          return field.rules()

        return true
      },
    }

    validateForm = new ValidateFormHandler(mockValidateFieldInstance)
  })

  it('should return true if fields does not have rules', () => {
    const fields = {
      firstName: {
        modelKey: 'firstName',
        errors: [],
        modelValue: 'John',
        type: 'text',
      },
      lastName: {
        modelKey: 'lastName',
        errors: [],
        modelValue: 'Doe',
        type: 'text',
      },
    }

    const command = new ValidateFormCommand(fields)
    const result = validateForm.execute(command)

    expect(result).toBeTruthy()
  })

  it('should return true if all fields are valid', () => {
    const fields = {
      firstName: {
        modelKey: 'firstName',
        errors: [],
        modelValue: 'John',
        type: 'text',
        rules: () => true,
      },
      lastName: {
        modelKey: 'lastName',
        errors: [],
        modelValue: 'Doe',
        type: 'text',
        rules: () => true,
      },
    }

    const command = new ValidateFormCommand(fields)
    const result = validateForm.execute(command)

    expect(result).toBeTruthy()
  })

  it('should return false if any field is invalid', () => {
    const fields = {
      firstName: {
        modelKey: 'firstName',
        errors: [],
        modelValue: 'John',
        type: 'text',
        rules: () => true,
      },
      lastName: {
        modelKey: 'lastName',
        errors: [],
        modelValue: '',
        type: 'text',
        rules: () => 'Last name is required',
      },
    }

    const command = new ValidateFormCommand(fields)
    const result = validateForm.execute(command)

    expect(result).toBeFalsy()
  })

  it('should pass options to validateField', () => {
    const fields = {
      firstName: {
        modelKey: 'firstName',
        errors: [],
        modelValue: 'John',
        type: 'text',
        rules: () => true,
      },
      lastName: {
        modelKey: 'lastName',
        errors: [],
        modelValue: '',
        type: 'text',
        rules: () => 'Last name is required',
      },
    }

    const options = {
      processResult: (result: any) => {
        return result
      },
    }

    const command = new ValidateFormCommand(fields, options)
    const result = validateForm.execute(command)

    expect(result).toBeFalsy()
  })
})
