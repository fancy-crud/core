import { GenerateFormData } from '@/forms/capabilities'

describe('GenerateFormData', () => {
  let generateFormData: GenerateFormData

  beforeEach(() => {
    generateFormData = new GenerateFormData()
  })

  it('should generate form data for fields with primitive values', () => {
    const fields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        modelValue: 'John',
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
        ref: null,
        wasFocused: false,
        modelValue: 'Doe',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Last Name',
      },
      isActive: {
        id: 'field-isActive-control',
        modelKey: 'isActive',
        name: 'isActive',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: true,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'radio',
      },
      isDisabled: {
        id: 'field-isDisabled-control',
        modelKey: 'isDisabled',
        name: 'isDisabled',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: false,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'radio',
      },
      age: {
        id: 'field-age-control',
        modelKey: 'age',
        name: 'age',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: 18,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'radio',
      },
    }

    const result = generateFormData.execute(fields)

    expect(result.jsonForm).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      isDisabled: false,
      age: 18,
    })
    expect(result.formData).toBeNull()
  })

  it('should generate form data for fields with lists', () => {
    const fields = {
      roles: {
        id: 'field-roles-control',
        modelKey: 'roles',
        name: 'roles',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: ['admin', 'user'],
        class: '',
        wrapper: {
          class: '',
        },
        type: 'select',
        label: 'Roles',
        url: '/roles',
      },
      hobbies: {
        id: 'field-hobbies-control',
        modelKey: 'hobbies',
        name: 'hobbies',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: [
          { action: 'reading', id: 1 },
          { action: 'swimming', id: 2 },
        ],
        class: '',
        wrapper: {
          class: '',
        },
        type: 'checkbox',
        label: 'Hobbies',
        url: '/hobbies',
        optionValue: 'id',
      },
    }

    const result = generateFormData.execute(fields)

    expect(result.jsonForm).toEqual({
      roles: ['admin', 'user'],
      hobbies: [1, 2],
    })
    expect(result.formData).toBeNull()
  })

  it('should generate form data for fields with file values', () => {
    const fields = {
      avatar: {
        id: 'field-avatar-control',
        modelKey: 'avatar',
        name: 'avatar',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: [
          new File(['avatar-image'], 'avatar.jpg', { type: 'image/jpeg' }),
        ],
        class: '',
        wrapper: {
          class: '',
        },
        type: 'file',
        label: 'Avatar',
      },
      resume: {
        id: 'field-resume-control',
        modelKey: 'resume',
        name: 'resume',
        errors: [],
        ref: null,
        wasFocused: false,
        modelValue: new File(['resume-file'], 'resume.pdf', { type: 'application/pdf' }),
        class: '',
        wrapper: {
          class: '',
        },
        type: 'file',
        label: 'Resume',
      },
    }

    const result = generateFormData.execute(fields)

    expect(result.jsonForm).toEqual({})
    expect(result.formData).toBeInstanceOf(FormData)
    expect(result.formData?.get('avatar')).toEqual(
      fields.avatar.modelValue[0],
    )
    expect(result.formData?.get('resume')).toEqual(
      fields.resume.modelValue,
    )
  })

  it('should handle fields with no modelValue', () => {
    const fields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
      },
      hobbies: {
        id: 'field-hobbies-control',
        modelKey: 'hobbies',
        name: 'hobbies',
        errors: [],
        wasFocused: false,
        ref: null,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'checkbox',
        label: 'Hobbies',
        url: '/hobbies',
        optionValue: 'id',
      },
    }

    const result = generateFormData.execute(fields)

    expect(result.jsonForm).toEqual({
      firstName: null,
      hobbies: null,
    })
    expect(result.formData).toBeNull()
  })
})
