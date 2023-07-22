import { ValidateFieldRules } from '@/forms/capabilities'

describe('ValidateFieldRules', () => {
  let validateFieldRules: ValidateFieldRules

  beforeEach(() => {
    validateFieldRules = new ValidateFieldRules()
  })

  it('should return true if no rules are defined for the field', () => {
    const field = {
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
    }

    const result = validateFieldRules.execute(field)

    expect(result).toBe(true)
    expect(field.errors).toEqual([])
  })

  it('should set errors if the rule returns a string', () => {
    const field = {
      id: 'field-email-control',
      modelKey: 'email',
      name: 'email',
      errors: [],
      wasFocused: false,
      modelValue: 'john.doe@example.com',
      class: '',
      ref: null,
      wrapper: {
        class: '',
      },
      type: 'email',
      label: 'Email',
      rules: (value: string) => {
        if (!value.includes('@'))
          return 'Invalid email address'

        return true
      },
    }

    const result = validateFieldRules.execute(field)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it('should set errors if the rule returns a boolean', () => {
    const field = {
      id: 'field-password-control',
      modelKey: 'password',
      name: 'password',
      errors: [],
      ref: null,
      wasFocused: false,
      modelValue: 'password123',
      class: '',
      wrapper: {
        class: '',
      },
      type: 'password',
      label: 'Password',
      rules: (value: string) => {
        return value.length >= 8
      },
    }

    const result = validateFieldRules.execute(field)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it('should not set errors if the preventErrorMessage option is enabled', () => {
    const field = {
      id: 'field-username-control',
      modelKey: 'username',
      name: 'username',
      errors: [],
      ref: null,
      wasFocused: false,
      modelValue: 'johndoe',
      class: '',
      wrapper: {
        class: '',
      },
      type: 'text',
      label: 'Username',
      rules: (value: string) => {
        if (value.length < 5)
          return 'Username must be at least 5 characters long'

        return true
      },
    }

    const options = {
      preventErrorMessage: true,
    }

    const result = validateFieldRules.execute(field, options)

    expect(result).toBe(true)
    expect(field.errors).toEqual([])
  })

  it('should process the result using the custom processResult function', () => {
    const field = {
      id: 'field-age-control',
      modelKey: 'age',
      name: 'age',
      errors: [],
      wasFocused: false,
      modelValue: 18,
      ref: null,
      class: '',
      wrapper: {
        class: '',
      },
      type: 'number',
      label: 'Age',
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

    const result = validateFieldRules.execute(field, options)

    expect(result).toBeTruthy()
    expect(field.errors).toEqual([])
  })

  it('should throw an error if the rule does not return a string or boolean', () => {
    const field = {
      id: 'field-amount-control',
      modelKey: 'amount',
      name: 'amount',
      errors: [],
      wasFocused: false,
      ref: null,
      modelValue: 100,
      class: '',
      wrapper: {
        class: '',
      },
      type: 'number',
      label: 'Amount',
      rules: (value: number) => {
        return value > 0 ? 1 : 'Invalid amount'
      },
    }

    expect(() => {
      validateFieldRules.execute(field)
    }).toThrowError('Unable to validate the field amount, rules function needs to return string or true. Otherwise you will need to process the initial return')

    expect(field.errors).toEqual([])
  })
})
