import { getDefaults } from '@packages/core/config'
import type { INormalizeTableButtonsHandler, NormalizeTableButtonsCommand } from '../axioma'
import type { ConvertToNormalizedTableButtons, NormalizedTableButtons, RawTableButtons } from '../axioma/typing/buttons'

export class NormalizeTableButtonsHandler implements INormalizeTableButtonsHandler {
  execute<T extends RawTableButtons>({ buttons }: NormalizeTableButtonsCommand<T>): NormalizedTableButtons {
    const { add = {}, edit = {}, remove = {}, ...customButtons } = buttons || {}
    const defaults = getDefaults()

    const rawButtons = {
      add, edit, remove, ...customButtons,
    }

    const defaultButtonsKeys = ['add', 'edit', 'remove', 'dump']
    const defaultButtons: NormalizedTableButtons = {
      add, edit, remove, ...customButtons,
    } as ConvertToNormalizedTableButtons<T>

    type ButtonKey = keyof typeof defaultButtons

    Object.entries(rawButtons).forEach(([buttonKey, button]) => {
      if (defaultButtonsKeys.includes(buttonKey)) {
        const defaultButton = defaults[`${buttonKey}Button`]
        defaultButtons[buttonKey as ButtonKey] = {
          ...defaultButton,
          ...button,
          hidden: button.hidden || false,
          class: button?.class || defaultButton?.class || '',
          isLoading: button?.isLoading || false,
        }
      }
      else {
        defaultButtons[buttonKey as ButtonKey] = {
          ...button,
          hidden: button.hidden || false,
          class: button?.class || '',
          isLoading: button?.isLoading || false,
        }
      }
    })

    return defaultButtons
  }
}
