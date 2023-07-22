import { HandleErrors } from '@/forms/capabilities'

describe('HandleErrors', () => {
  let handleErrors: HandleErrors

  beforeEach(() => {
    handleErrors = new HandleErrors()
  })

  it('should fill the normalized fields with corresponding errors', () => {
    const normalizedFields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
      },
      lastName: {
        id: 'field-lastName-control',
        modelKey: 'lastName',
        name: 'lastName',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
      },
    }

    const errors = {
      firstName: ['First name is required.'],
      lastName: ['Last name is required.'],
    }

    handleErrors.execute(normalizedFields, errors)

    expect(normalizedFields.firstName.errors).toEqual(['First name is required.'])
    expect(normalizedFields.lastName.errors).toEqual(['Last name is required.'])
  })

  it('should handle errors for non-existent fields', () => {
    const normalizedFields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
      },

    }

    const errors = {
      firstName: ['First name is required.'],
      lastName: ['Last name is required.'],
    }

    handleErrors.execute(normalizedFields, errors)

    expect(normalizedFields.firstName.errors).toEqual(['First name is required.'])
  })
})
