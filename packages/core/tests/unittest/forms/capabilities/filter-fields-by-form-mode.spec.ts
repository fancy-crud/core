import '@packages/core/forms/integration/load-commands'
import { FilterFieldsByFormModeCommand, UnknownFormMode } from '@packages/core/forms/axioma'
import { beforeEach, describe, expect, it } from 'vitest'

describe('FilterFieldsByFormModeHandler', () => {
  let fields: Record<string, { hidden?: boolean; createOnly?: boolean; updateOnly?: boolean }>
  beforeEach(() => {
    fields = {
      field1: { },
      field2: { hidden: true },
      field3: { createOnly: true },
      field4: { updateOnly: true },
      field5: { createOnly: true, updateOnly: true },
      field6: { hidden: true, createOnly: true, updateOnly: true },
      field7: { hidden: false, createOnly: false, updateOnly: false },
    }
  })
  it.concurrent('should filter fields based on the form mode (create)', () => {
    const formMode = 'create' // Assuming that FORM_MODE.create is defined somewhere

    const command = new FilterFieldsByFormModeCommand(fields, formMode)
    const handler = command.meta.Handler()
    const result = handler.execute(command)

    // The result should only contain field1 because it is not hidden, not createOnly, and not updateOnly.
    expect(result).toEqual([
      ['field1', fields.field1],
      ['field2', fields.field2],
      ['field3', fields.field3],
      ['field7', fields.field7],
    ])
  })

  it.concurrent('should filter fields based on the form mode (update)', () => {
    const formMode = 'update' // Assuming that FORM_MODE.update is defined somewhere

    const command = new FilterFieldsByFormModeCommand(fields, formMode)
    const handler = command.meta.Handler()
    const result = handler.execute(command)

    expect(result).toEqual([
      ['field1', fields.field1],
      ['field2', fields.field2],
      ['field4', fields.field4],
      ['field7', fields.field7],
    ])
  })

  it.concurrent('should return a exception if receives a unknown form mode', () => {
    const formMode = 'unknown' as unknown as any

    expect(() => new FilterFieldsByFormModeCommand(fields, formMode)).toThrowError(UnknownFormMode)
  })
})
