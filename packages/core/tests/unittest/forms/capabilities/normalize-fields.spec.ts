import '@packages/core/forms/integration/register-handlers'
import { NormalizeFormFieldsCommand } from '@packages/core/forms/axioma'
import { describe, expect, it } from 'vitest'
import {components} from '@packages/core/config';

describe('NormalizeFormFields', () => {
  function _getComponent(fieldType: string) {
    type ControlType = keyof typeof defaultControls

    const control = defaultControls[fieldType]

    return control ?? (defaultControls[fieldType as ControlType] ?? defaultControls.text)
  }

  const recordValue = (_: any) => null
  const interceptOptions = (options: any[]) => options
  const parseModelValue = (value: any) => value
  const getComponent = () => _getComponent('text')

  const defaultControls: Record<string, any> = {
    ...components,
  }

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
        interceptOptions,
        parseModelValue,
        getComponent
      },
      lastName: {
        type: 'text',
        label: 'Last Name',
        recordValue,
        interceptOptions,
        parseModelValue,
        getComponent
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
      debounceTime: 0,
      recordValue,
      interceptOptions,
      parseModelValue,
      getComponent,
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
      debounceTime: 0,
      recordValue,
      interceptOptions,
      parseModelValue,
      getComponent,
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
        interceptOptions,
        parseModelValue,
        getComponent
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
      debounceTime: 0,
      recordValue,
      interceptOptions,
      parseModelValue,
      getComponent,
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
        debounceTime: 0,
        recordValue,
        interceptOptions,
        parseModelValue,
        getComponent
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
      interceptOptions,
      parseModelValue,
      getComponent,
      debounceTime: 0,
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
