import '@packages/core/forms/integration/load-commands'
import { handlers } from '@packages/core/common/bus/axioma'
import { IValidateFormHandler, ValidateFormCommand } from '@packages/core/forms/axioma'
import { ValidateFormHandler } from '@packages/core/forms/capabilities'
import { beforeEach, describe, expect, it } from 'vitest'

handlers.set(IValidateFormHandler.name, ValidateFormHandler)

describe('ValidateForm', () => {
  let mockValidateFieldInstance: any

  beforeEach(() => {
    mockValidateFieldInstance = {
      execute: ({ field }: { field: { rules: () => true | string } }) => {
        if (field.rules)
          return field.rules()

        return true
      },
    }
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
    const result = command.meta.Handler(mockValidateFieldInstance).execute(command)

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
    const result = command.meta.Handler(mockValidateFieldInstance).execute(command)

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
    const result = command.meta.Handler(mockValidateFieldInstance).execute(command)

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
    const result = command.meta.Handler(mockValidateFieldInstance).execute(command)

    expect(result).toBeFalsy()
  })
})
