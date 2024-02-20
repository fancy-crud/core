import '@packages/core/forms/integration/register-handlers'
import { IValidateFieldRulesHandler, UnprocessableValidationResult, ValidateFieldRulesCommand } from '@packages/core/forms/axioma'
import { handlers } from '@packages/core/index'
import { describe, expect, it } from 'vitest'
import { ValidateFieldRulesHandler } from '@packages/core/forms/capabilities'

handlers.set(IValidateFieldRulesHandler.name, ValidateFieldRulesHandler)

describe('ValidateFieldRules', () => {
  it.concurrent('should return true if no rules are defined for the field', () => {
    const field = {
      modelKey: 'firstName',
      errors: [],
      modelValue: 'John',
      type: 'text',
    }

    const command = new ValidateFieldRulesCommand(field)
    const result = command.meta.Handler().execute(command)

    expect(result).toBe(true)
    expect(field.errors).toEqual([])
  })

  it.concurrent('should set errors if the rule returns a string', () => {
    const field = {
      modelKey: 'email',
      errors: [],
      modelValue: 'john.doe@example.com',
      type: 'email',
      rules: (value: string) => {
        if (!value.includes('@'))
          return 'Invalid email address'

        return true
      },
    }

    const command = new ValidateFieldRulesCommand(field)
    const result = command.meta.Handler().execute(command)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it.concurrent('should set errors if the rule returns a boolean', () => {
    const field = {
      modelKey: 'password',
      errors: [],
      modelValue: 'password123',
      type: 'password',
      rules: (value: string) => {
        return value.length >= 8
      },
    }

    const command = new ValidateFieldRulesCommand(field)
    const result = command.meta.Handler().execute(command)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it.concurrent('should not set errors if the preventErrorMessage option is enabled', () => {
    const field = {
      modelKey: 'username',
      errors: [],
      modelValue: 'johndoe',
      type: 'text',
      rules: (value: string) => {
        if (value.length < 5)
          return 'Username must be at least 5 characters long'

        return true
      },
    }

    const options = {
      preventErrorMessage: true,
    }

    const command = new ValidateFieldRulesCommand(field, options)
    const result = command.meta.Handler().execute(command)

    expect(result).toBe(true)
    expect(field.errors).toEqual([])
  })

  it.concurrent('should process the result using the custom rule parser function', () => {
    const field = {
      modelKey: 'age',
      errors: [],
      modelValue: 18,
      type: 'number',
      rules: (value: number) => {
        if (value < 18)
          return 'You must be at least 18 years old'

        return true
      },
    }

    const options = {
      parser: (result: unknown) => {
        if (typeof result === 'string')
          return result

        return true
      },
    }

    const command = new ValidateFieldRulesCommand(field, options)
    const result = command.meta.Handler().execute(command)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it.concurrent('should throw an error if the rule does not return a string or boolean', () => {
    const field = {
      modelKey: 'amount',
      errors: [],
      modelValue: 100,
      type: 'number',
      rules: (value: number) => {
        return value > 0 ? 1 : 'Invalid amount'
      },
    }
    const command = new ValidateFieldRulesCommand(field)

    expect(() => {
      command.meta.Handler().execute(command)
    }).toThrowError(UnprocessableValidationResult)

    expect(field.errors).toEqual([])
  })
})
