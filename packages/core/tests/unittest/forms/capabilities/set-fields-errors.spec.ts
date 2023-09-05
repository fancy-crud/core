import { SetFieldsErrorsCommand } from '@packages/core/forms/capabilities'
import { describe, expect, it } from 'vitest'

describe('SetFieldsErrors', () => {
  it.concurrent('should fill the normalized fields with corresponding errors', () => {
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

    const command = new SetFieldsErrorsCommand(normalizedFields, errors)

    new command.meta.Handler().execute(command)

    expect(normalizedFields.firstName.errors).toEqual(['First name is required.'])
    expect(normalizedFields.lastName.errors).toEqual(['Last name is required.'])
  })

  it.concurrent('should handle errors for non-existent fields', () => {
    const normalizedFields = {
      firstName: {
        errors: [],
      },
    }

    const errors = {
      firstName: ['First name is required.'],
      lastName: ['Last name is required.'],
    }

    const command = new SetFieldsErrorsCommand(normalizedFields, errors)
    new command.meta.Handler().execute(command)

    expect(normalizedFields.firstName.errors).toEqual(['First name is required.'])
    expect((normalizedFields as any).lastName?.errors).toBeUndefined()
  })
})
