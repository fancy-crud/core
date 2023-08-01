import { FillWithRecordValuesCommand, FillWithRecordValuesHandler } from '@/forms/capabilities'

describe('FillWithRecordValues', () => {
  let fillWithRecordValues: FillWithRecordValuesHandler

  beforeEach(() => {
    fillWithRecordValues = new FillWithRecordValuesHandler()
  })

  it('should fill the normalized fields with corresponding values from the record', () => {
    const normalizedFields = {
      firstName: {
        recordValue: (value: { firstName: string }) => value.firstName,
        modelValue: '',
        type: 'text',
      },
      address: {
        recordValue: (value: { address: string }) => value.address,
        modelValue: '',
        type: 'text',
      },
      phone: {
        recordValue: (value: { contact: { phone: string } }) => value.contact.phone,
        modelValue: '',
        type: 'text',
      },
    }

    const recordValues = {
      firstName: 'John',
      address: '123 Main St',
      contact: {
        phone: '555-1234',
      },
    }

    const command = new FillWithRecordValuesCommand(normalizedFields, recordValues)
    fillWithRecordValues.execute(command)

    expect(normalizedFields.firstName.modelValue).toEqual('John')
    expect(normalizedFields.address.modelValue).toEqual('123 Main St')
    expect(normalizedFields.phone.modelValue).toEqual('555-1234')
  })

  it('should handle nested fields that are not present in the record', () => {
    const normalizedFields = {
      firstName: {
        recordValue: (value: { firstName: string }) => value.firstName,
        modelValue: '',
        type: 'text',
      },
      phone: {
        recordValue: (_: unknown) => null,
        modelValue: null,
        type: 'text',
      },
    }

    const recordValues = {
      firstName: 'John',
    }

    const command = new FillWithRecordValuesCommand(normalizedFields, recordValues)
    fillWithRecordValues.execute(command)

    expect(normalizedFields.firstName.modelValue).toEqual('John')
    expect(normalizedFields.phone.modelValue).toBeNull()
  })

  it('should handle fields with file types', () => {
    const normalizedFields = {
      avatar: {
        recordValue: (value: { avatar: string }) => value.avatar,
        modelValue: '',
        type: 'file',
        fileUrl: null,
      },
      backgroundImage: {
        recordValue: (value: { backgroundImage: string }) => value.backgroundImage,
        modelValue: '',
        type: 'image',
        fileUrl: null,
      },
    }

    const recordValues = {
      avatar: '/path/to/avatar.jpg',
      backgroundImage: '/path/to/background.jpg',
    }

    const command = new FillWithRecordValuesCommand(normalizedFields, recordValues)
    fillWithRecordValues.execute(command)

    expect(normalizedFields.avatar.fileUrl).toEqual('/path/to/avatar.jpg')
    expect(normalizedFields.backgroundImage.fileUrl).toEqual('/path/to/background.jpg')
  })
})
