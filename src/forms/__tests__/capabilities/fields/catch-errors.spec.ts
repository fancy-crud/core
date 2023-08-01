import { CatchErrorsCommand, CatchErrorsHandler } from '@/forms/capabilities'

describe('CatchErrors', () => {
  let handleErrors: CatchErrorsHandler

  beforeEach(() => {
    handleErrors = new CatchErrorsHandler()
  })

  it('should fill the normalized fields with corresponding errors', () => {
    const normalizedFields = {
      firstName: {
        errors: [],
      },
      lastName: {
        errors: [],
      },
    }

    const errors = {
      firstName: ['First name is required.'],
      lastName: ['Last name is required.'],
    }

    const command = new CatchErrorsCommand(normalizedFields, errors)

    handleErrors.execute(command)

    expect(normalizedFields.firstName.errors).toEqual(['First name is required.'])
    expect(normalizedFields.lastName.errors).toEqual(['Last name is required.'])
  })

  it('should handle errors for non-existent fields', () => {
    const normalizedFields = {
      firstName: {
        errors: [],
      },
    }

    const errors = {
      firstName: ['First name is required.'],
      lastName: ['Last name is required.'],
    }

    const command = new CatchErrorsCommand(normalizedFields, errors)
    handleErrors.execute(command)

    expect(normalizedFields.firstName.errors).toEqual(['First name is required.'])
    expect((normalizedFields as any).lastName?.errors).toBeUndefined()
  })
})
