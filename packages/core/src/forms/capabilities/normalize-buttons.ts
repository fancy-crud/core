import type { NormalizedButton, NormalizedButtons } from '@packages/core/forms/axioma'
import { getDefaults } from '@packages/core/config'
import { t } from '@packages/core/locales'
import type { INormalizeButtonsHandler, NormalizeButtonsCommand, NormalizeButtonsInputType } from '../axioma'

export class NormalizeButtonsHandler implements INormalizeButtonsHandler {
  execute<T extends NormalizeButtonsInputType>({ buttons }: NormalizeButtonsCommand<T>): NormalizedButtons<T> {
    const { main = {}, aux = {} } = buttons || {}
    const defaults = getDefaults()

    const defaultMainButton: NormalizedButton = {
      ...defaults.mainButton,
      ...main,
      class: main?.class || defaults.mainButton?.class,
      isLoading: main?.isLoading || false,
      hidden: aux.hidden || false,
      label: main?.label ?? `{{ ${t('create-new')} | ${t('update-record')} }}`,
    }

    const defaultAuxButton: NormalizedButton = {
      ...defaults.auxButton,
      ...aux,
      isLoading: aux.isLoading || false,
      hidden: aux.hidden || false,
      class: aux.class || defaults.auxButton?.class,
      label: aux.label ?? t('cancel'),
    }

    const defaultButtons = {
      main: defaultMainButton,
      aux: defaultAuxButton,
    }

    const normalizedButtons: NormalizedButtons<T> = Object.assign({}, buttons, defaultButtons)
    return normalizedButtons
  }
}

