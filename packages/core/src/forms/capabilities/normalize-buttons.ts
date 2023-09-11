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
      icon: main?.icon || '',
      label: {
        create: main?.label?.create || t('create-new'),
        update: main?.label?.update || t('update-record'),
      },
    }

    const defaultAuxButton: NormalizedButton = {
      ...defaults.auxButton,
      ...aux,
      isLoading: aux.isLoading || false,
      icon: aux.icon || '',
      class: aux.class || defaults.auxButton?.class,
      label: {
        create: aux.label?.create || t('cancel'),
        update: aux.label?.update || t('cancel'),
      },
    }

    const defaultButtons = {
      main: defaultMainButton,
      aux: defaultAuxButton,
    }

    const normalizedButtons: NormalizedButtons<T> = Object.assign({}, buttons, defaultButtons)
    return normalizedButtons
  }
}

