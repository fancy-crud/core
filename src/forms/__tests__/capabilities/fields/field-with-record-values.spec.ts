import { FillWithRecordValues } from '@/forms/capabilities'

describe('FillWithRecordValues', () => {
  let fillWithRecordValues: FillWithRecordValues

  beforeEach(() => {
    fillWithRecordValues = new FillWithRecordValues()
  })

  it('should fill the normalized fields with corresponding values from the record', () => {
    const normalizedFields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],
        wasFocused: false,
        ref: null,
        recordValue: (value: { firstName: string }) => value.firstName,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
      },
      address: {
        id: 'field-address-control',
        modelKey: 'address',
        name: 'address',
        errors: [],
        wasFocused: false,
        ref: null,
        recordValue: (value: { address: string }) => value.address,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Address',
      },
      phone: {
        id: 'field-phone-control',
        modelKey: 'phone',
        name: 'phone',
        ref: null,
        recordValue: (value: { contact: { phone: string } }) => value.contact.phone,
        errors: [],
        wasFocused: false,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Phone',
      },
    }

    const recordValues = {
      firstName: 'John',
      address: '123 Main St',
      contact: {
        phone: '555-1234',
      },
    }

    fillWithRecordValues.execute(normalizedFields, recordValues)

    expect(normalizedFields.firstName.modelValue).toEqual('John')
    expect(normalizedFields.address.modelValue).toEqual('123 Main St')
    expect(normalizedFields.phone.modelValue).toEqual('555-1234')
  })

  it('should handle nested fields that are not present in the record', () => {
    const normalizedFields = {
      firstName: {
        id: 'field-firstName-control',
        modelKey: 'firstName',
        name: 'firstName',
        errors: [],

        wasFocused: false,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'First Name',
        ref: null,
        recordValue: (value: { firstName: string }) => value.firstName,
      },
      phone: {
        id: 'field-phone-control',
        modelKey: 'phone',
        name: 'phone',
        errors: [],
        wasFocused: false,
        modelValue: null,
        class: '',
        wrapper: {
          class: '',
        },
        type: 'text',
        label: 'Phone',
        ref: null,
        recordValue: (_: unknown) => null,
      },
    }

    const recordValues = {
      firstName: 'John',
    }

    fillWithRecordValues.execute(normalizedFields, recordValues)

    expect(normalizedFields.firstName.modelValue).toEqual('John')
    expect(normalizedFields.phone.modelValue).toBeNull()
  })

  it('should handle fields with file types', () => {
    const normalizedFields = {
      avatar: {
        id: 'field-avatar-control',
        modelKey: 'avatar',
        name: 'avatar',
        errors: [],
        wasFocused: false,
        modelValue: '',
        fileUrl: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'file',
        label: 'Avatar',
        ref: null,
        recordValue: (value: { avatar: string }) => value.avatar,
      },
      backgroundImage: {
        id: 'field-backgroundImage-control',
        modelKey: 'backgroundImage',
        name: 'backgroundImage',
        errors: [],
        fileUrl: '',
        wasFocused: false,
        modelValue: '',
        class: '',
        wrapper: {
          class: '',
        },
        type: 'image',
        label: 'Background Image',
        ref: null,
        recordValue: (value: { backgroundImage: string }) => value.backgroundImage,
      },
    }

    const recordValues = {
      avatar: '/path/to/avatar.jpg',
      backgroundImage: '/path/to/background.jpg',
    }

    fillWithRecordValues.execute(normalizedFields, recordValues)

    expect(normalizedFields.avatar.fileUrl).toEqual('/path/to/avatar.jpg')
    expect(normalizedFields.backgroundImage.fileUrl).toEqual('/path/to/background.jpg')
  })
})
