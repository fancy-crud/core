import { GenerateFormDataCommand } from '@/forms/capabilities'

describe('GenerateFormData', () => {
  it.concurrent('should generate form data for fields with primitive values', () => {
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
      isActive: {
        modelKey: 'isActive',
        errors: [],
        modelValue: true,
        type: 'radio',
      },
      isDisabled: {
        modelKey: 'isDisabled',
        errors: [],
        modelValue: false,
        type: 'radio',
      },
      age: {
        modelKey: 'age',
        errors: [],
        modelValue: 18,
        type: 'radio',
      },
    }

    const command = new GenerateFormDataCommand(fields)
    const result = new command.meta.Handler().execute(command)

    expect(result.jsonForm).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      isDisabled: false,
      age: 18,
    })
    expect(result.formData).toBeNull()
  })

  it.concurrent('should generate form data for fields with lists', () => {
    const fields = {
      roles: {
        modelKey: 'roles',
        errors: [],
        modelValue: ['admin', 'user'],
        type: 'select',
        label: 'Roles',
        url: '/roles',
      },
      hobbies: {
        modelKey: 'hobbies',
        errors: [],
        modelValue: [
          { action: 'reading', id: 1 },
          { action: 'swimming', id: 2 },
        ],
        type: 'checkbox',
        url: '/hobbies',
        optionValue: 'id',
      },
    }

    const command = new GenerateFormDataCommand(fields)
    const result = new command.meta.Handler().execute(command)

    expect(result.jsonForm).toEqual({
      roles: ['admin', 'user'],
      hobbies: [1, 2],
    })
    expect(result.formData).toBeNull()
  })

  it.concurrent('should generate form data for fields with file values', () => {
    const fields = {
      avatar: {
        modelKey: 'avatar',
        errors: [],
        modelValue: [
          new File(['avatar-image'], 'avatar.jpg', { type: 'image/jpeg' }),
        ],
        type: 'file',
      },
      resume: {
        modelKey: 'resume',
        errors: [],
        modelValue: new File(['resume-file'], 'resume.pdf', { type: 'application/pdf' }),
        type: 'file',
      },
    }

    const command = new GenerateFormDataCommand(fields)
    const result = new command.meta.Handler().execute(command)

    expect(result.jsonForm).toEqual({})
    expect(result.formData).toBeInstanceOf(FormData)
    expect(result.formData?.get('avatar')).toEqual(
      fields.avatar.modelValue[0],
    )
    expect(result.formData?.get('resume')).toEqual(
      fields.resume.modelValue,
    )
  })

  it.concurrent('should handle fields with no modelValue', () => {
    const fields = {
      firstName: {
        modelKey: 'firstName',
        errors: [],
        modelValue: null,
        type: 'text',
      },
      hobbies: {
        modelKey: 'hobbies',
        errors: [],
        modelValue: null,
        type: 'checkbox',
        optionValue: 'id',
      },
    }

    const command = new GenerateFormDataCommand(fields)
    const result = new command.meta.Handler().execute(command)

    expect(result.jsonForm).toEqual({
      firstName: null,
      hobbies: null,
    })
    expect(result.formData).toBeNull()
  })
})
