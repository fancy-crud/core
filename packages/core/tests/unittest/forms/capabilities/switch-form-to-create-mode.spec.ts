import '@packages/core/forms/integration/load-commands'
import type { FormState, NormalizedButtons, NormalizedSettings, SwitchFormToCreateModeCommandInput } from '@packages/core/forms/axioma'
import { FORM_MODE, SwitchFormToCreateModeCommand, formStore } from '@packages/core/forms/axioma'
import { beforeEach, describe, expect, it, vi } from 'vitest'

class MockResetFields {
  constructor(
    private formId: symbol,
  ) {}

  execute<U>(_: any): U {
    return formStore.get(this.formId) as U
  }
}

class MockFormStore {
  searchById(formId: symbol): FormState | undefined {
    return formStore.get(formId)
  }
}

describe('SwitchFormToCreateModeHandler', () => {
  let formId: symbol

  beforeEach(() => {
    formStore.clear()
    formId = Symbol('test-form-id')
  })

  it('should switch form mode to "create" when given a symbol as form ID', () => {
    const form = {
      originalNormalizedFields: {},
      fields: {},
      buttons: { aux: {} },
      settings: { mode: FORM_MODE.update },
      titles: {},
    } as unknown as FormState

    formStore.set(formId, form)
    const mockResetFields = new MockResetFields(formId)
    const mockFormStore = new MockFormStore()

    const command = new SwitchFormToCreateModeCommand(formId)
    const handler = command.meta.Handler(mockResetFields, mockFormStore)

    handler.execute(command)

    expect(form.settings.mode).toBe(FORM_MODE.create)
  })

  it('should switch form mode to "create" when given a form object', () => {
    const form: SwitchFormToCreateModeCommandInput = {
      originalNormalizedFields: {},
      fields: {},
      buttons: { aux: {} } as NormalizedButtons<{ aux: {} }>,
      settings: { mode: FORM_MODE.update } as NormalizedSettings,
    }
    const mockResetFields = new MockResetFields(formId)
    const mockFormStore = new MockFormStore()
    const command = new SwitchFormToCreateModeCommand(form)
    const handler = command.meta.Handler(mockResetFields, mockFormStore)

    handler.execute(command)

    expect(form.settings.mode).toBe(FORM_MODE.create)
  })

  it('should assign onClickAux to aux button when onClickAux is provided', () => {
    const form = { fields: {}, buttons: { aux: { onClick: undefined } }, settings: { mode: FORM_MODE.update } }
    formStore.set(formId, form as unknown as FormState)

    const onClickAux = vi.fn()

    const mockResetFields = new MockResetFields(formId)
    const mockFormStore = new MockFormStore()
    mockResetFields.execute = () => form as any

    const options = { onClickAux }
    const command = new SwitchFormToCreateModeCommand(formId, { ...options })
    const handler = command.meta.Handler(mockResetFields, mockFormStore)

    handler.execute(command)

    expect(form.buttons.aux.onClick).toBe(onClickAux)
  })
})
