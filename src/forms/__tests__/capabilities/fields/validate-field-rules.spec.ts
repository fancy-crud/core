import { ValidateFieldRulesCommand, ValidateFieldRulesHandler } from '@/forms/capabilities'

describe('ValidateFieldRules', () => {
  let validateFieldRules: ValidateFieldRulesHandler

  beforeEach(() => {
    validateFieldRules = new ValidateFieldRulesHandler()
  })

  it('should return true if no rules are defined for the field', () => {
    const field = {
      modelKey: 'firstName',
      errors: [],
      modelValue: 'John',
      type: 'text',
    }

    const command = new ValidateFieldRulesCommand(field)
    const result = validateFieldRules.execute(command)

    expect(result).toBe(true)
    expect(field.errors).toEqual([])
  })

  it('should set errors if the rule returns a string', () => {
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
    const result = validateFieldRules.execute(command)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it('should set errors if the rule returns a boolean', () => {
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
    const result = validateFieldRules.execute(command)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it('should not set errors if the preventErrorMessage option is enabled', () => {
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
    const result = validateFieldRules.execute(command)

    expect(result).toBe(true)
    expect(field.errors).toEqual([])
  })

  it('should process the result using the custom processResult function', () => {
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
      processResult: (result: unknown) => {
        if (typeof result === 'string')
          return result

        return true
      },
    }

    const command = new ValidateFieldRulesCommand(field, options)
    const result = validateFieldRules.execute(command)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it('should throw an error if the rule does not return a string or boolean', () => {
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
      validateFieldRules.execute(command)
    }).toThrowError('Unable to validate the field amount, rules function needs to return string or true. Otherwise you will need to process the initial return')

    expect(field.errors).toEqual([])
  })
})
