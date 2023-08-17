import { ResetFieldsCommand } from 'packages/core/forms/capabilities'

describe('ResetFields', () => {
  it.concurrent('should reset the model value of fields in a normalized fields object', () => {
    const clonedFields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        modelValue: 'John',
        class: '',
        ref: null,
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
        wasFocused: false,
        modelValue: 'Doe',
        class: '',
        ref: null,
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
      },
    }

    const originalFields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        modelValue: null,
        ref: null,
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
        wasFocused: false,
        modelValue: null,
        ref: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
      },
    }

    const command = new ResetFieldsCommand(clonedFields, originalFields)
    new command.meta.Handler().execute(command)

    expect(clonedFields).toMatchObject(originalFields)
  })

  it.concurrent('should handle fields with additional properties', () => {
    const clonedFields = {
      email: {
        id: 'field-email-control',
        modelKey: 'email',
        name: 'email',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: 'john.doe@example.com',
        class: '',
        wrapper: {
          class: 'className',
        },
        type: 'email',
        label: 'Email',
      },
    }

    const originalFields = {
      email: {
        id: 'field-email-control',
        modelKey: 'email',
        name: 'email',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'email',
        label: 'Email',
        required: true,
      },
    }

    const command = new ResetFieldsCommand(clonedFields, originalFields)
    new command.meta.Handler().execute(command)

    expect(clonedFields).toMatchObject(originalFields)
  })
})
