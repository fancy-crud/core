import '@packages/core/forms/integration/register-handlers'
import { NormalizeFormFieldsCommand } from '@packages/core/forms/axioma'
import { describe, expect, it } from 'vitest'

describe('NormalizeFormFields', () => {
  const recordValue = (_: any) => null

  it.concurrent('should normalize form fields with default values when no fields are provided', () => {
    const command = new NormalizeFormFieldsCommand({})
    const normalized = command.meta.Handler().execute(command)

    expect(normalized).toEqual({})
  })

  it.concurrent('should normalize form fields by merging provided fields with default values', () => {
    const fields = {
      firstName: {
        type: 'text',
        label: 'First Name',
        recordValue,
      },
      lastName: {
        type: 'text',
        label: 'Last Name',
        recordValue,
      },
    }

    const command = new NormalizeFormFieldsCommand(fields)
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.firstName).toEqual({
      ...fields.firstName,
      id: 'field-firstName-control',
      modelKey: 'firstName',
      name: 'firstName',
      errors: [],
      recordValue,
      wasFocused: false,
      modelValue: null,
      ref: null,
      class: '',
      wrapper: {
        class: '',
      },
    })

    expect(normalized.lastName).toEqual({
      ...fields.lastName,
      id: 'field-lastName-control',
      modelKey: 'lastName',
      name: 'lastName',
      errors: [],
      recordValue,
      wasFocused: false,
      ref: null,
      modelValue: null,
      class: '',
      wrapper: {
        class: '',
      },
    })
  })

  it.concurrent('should prioritize provided field properties over default values', () => {
    const fields = {
      email: {
        type: 'email',
        label: 'Email',
        class: 'custom-class',
        recordValue,
      },
    }

    const command = new NormalizeFormFieldsCommand(fields)
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.email).toEqual({
      ...fields.email,
      id: 'field-email-control',
      modelKey: 'email',
      name: 'email',
      errors: [],
      recordValue,
      wasFocused: false,
      modelValue: null,
      ref: null,
      wrapper: {
        class: '',
      },
    })
  })

  it.concurrent('should handle fields with additional properties', () => {
    const fields = {
      password: {
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 8,
        recordValue,
      },
    }

    const command = new NormalizeFormFieldsCommand(fields)
    const normalized = command.meta.Handler().execute(command)

    expect(normalized.password).toEqual({
      ...fields.password,
      id: 'field-password-control',
      modelKey: 'password',
      name: 'password',
      errors: [],
      recordValue,
      wasFocused: false,
      modelValue: null,
      ref: null,
      class: '',
      wrapper: {
        class: '',
      },
    })
  })
})
