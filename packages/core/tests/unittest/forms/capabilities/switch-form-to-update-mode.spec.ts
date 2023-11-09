import '@packages/core/forms/integration/load-commands'
import { handlers } from '@fancy-crud/bus'
import type { FormState, NormalizedButtons, NormalizedSettings, SwitchFormToUpdateModeCommandInput } from '@packages/core/forms/axioma'
import { FORM_MODE, ISwitchFormToUpdateModeHandler, SwitchFormToUpdateModeCommand, formStore } from '@packages/core/forms/axioma'
import { SwitchFormToUpdateModeHandler } from '@packages/core/forms/capabilities'

import { beforeEach, describe, expect, it, vi } from 'vitest'

handlers.set(ISwitchFormToUpdateModeHandler.name, SwitchFormToUpdateModeHandler)

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

describe('SwitchFormToUpdateModeHandler', () => {
  let formId: symbol

  beforeEach(() => {
    formStore.clear()
    formId = Symbol('test-form-id')
  })

  it('should switch form mode to "update" when given a symbol as form ID', () => {
    const form = {
      originalNormalizedFields: {},
      fields: {},
      buttons: { aux: {} },
      settings: { mode: FORM_MODE.create },
      titles: {},
    } as unknown as FormState

    formStore.set(formId, form)
    const mockResetFields = new MockResetFields(formId)
    const mockFormStore = new MockFormStore()

    const command = new SwitchFormToUpdateModeCommand(formId)
    const handler = command.meta.Handler(mockResetFields, mockFormStore)

    handler.execute(command)

    expect(form.settings.mode).toBe(FORM_MODE.update)
  })

  it('should switch form mode to "update" when given a form object', () => {
    const form: SwitchFormToUpdateModeCommandInput = {
      originalNormalizedFields: {},
      fields: {},
      buttons: { aux: {} } as NormalizedButtons<{ aux: {} }>,
      settings: { mode: FORM_MODE.create } as NormalizedSettings,
    }
    const mockResetFields = new MockResetFields(formId)
    const mockFormStore = new MockFormStore()
    const command = new SwitchFormToUpdateModeCommand(form)
    const handler = command.meta.Handler(mockResetFields, mockFormStore)

    handler.execute(command)

    expect(form.settings.mode).toBe(FORM_MODE.update)
  })

  it('should assign onClickAux to aux button when onClickAux is provided', () => {
    const form = { fields: {}, buttons: { aux: { onClick: undefined } }, settings: { mode: FORM_MODE.create } }
    formStore.set(formId, form as unknown as FormState)

    const onClickAux = vi.fn()

    const mockResetFields = new MockResetFields(formId)
    const mockFormStore = new MockFormStore()

    mockResetFields.execute = () => form as any

    const options = { onClickAux }
    const command = new SwitchFormToUpdateModeCommand(formId, { ...options })
    const handler = command.meta.Handler(mockResetFields, mockFormStore)

    handler.execute(command)

    expect(form.buttons.aux.onClick).toBe(onClickAux)
  })
})
