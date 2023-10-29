import type { NormalizedButton, NormalizedButtons } from '@packages/core/forms/axioma'
import { getDefaults } from '@packages/core/config'
import type { INormalizeTableButtonsHandler, NormalizeTableButtonsCommand, NormalizeTableButtonsInputType } from '../axioma'

export class NormalizeTableButtonsHandler implements INormalizeTableButtonsHandler {
  execute<T extends NormalizeTableButtonsInputType>({ buttons }: NormalizeTableButtonsCommand<T>): NormalizedButtons<T> {
    const { add = {}, edit = {}, remove = {} } = buttons || {}
    const defaults = getDefaults()

    const addButton: NormalizedButton = {
      ...defaults.addButton,
      ...add,
      class: add?.class || defaults.addButton?.class,
      isLoading: add?.isLoading || false,
      icon: add?.icon || '',
    }

    const editButton: NormalizedButton = {
      ...defaults.editButton,
      ...edit,
      isLoading: edit.isLoading || false,
      icon: edit.icon || '',
      class: edit.class || defaults.editButton?.class,
    }

    const removeButton: NormalizedButton = {
      ...defaults.removeButton,
      ...remove,
      isLoading: remove.isLoading || false,
      icon: remove.icon || '',
      class: remove.class || defaults.removeButton?.class,
    }

    const defaultButtons = {
      add: addButton,
      edit: editButton,
      remove: removeButton,
    }

    const normalizedButtons: NormalizedButtons<T> = Object.assign({}, buttons, defaultButtons)
    return normalizedButtons
  }
}

