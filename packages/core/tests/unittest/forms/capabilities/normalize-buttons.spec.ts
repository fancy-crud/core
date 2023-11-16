import '@packages/core/forms/integration/load-commands'
import { setDefaults } from '@packages/core/config'
import { NormalizeButtonsCommand } from '@packages/core/forms/axioma'
import { describe, expect, it } from 'vitest'

describe('NormalizeButtons', () => {
  it.concurrent('should return normalized buttons when no buttons are provided and no defaults', () => {
    const command = new NormalizeButtonsCommand()
    const result = command.meta.Handler().execute(command)

    // Assert that the result has the expected properties/values
    expect(result).toEqual({
      main: {
        class: '',
        isLoading: false,
        hidden: false,
        label: '{{ Create new | Update record }}',
      },
      aux: {
        class: '',
        isLoading: false,
        hidden: false,
        label: 'Cancel',
      },
    })

    // Additional assertions for more specific properties/values
    expect(result.main.class).toBe('')
    expect(result.aux.class).toBe('')
  })

  it.concurrent('should return normalized buttons with defaults when no buttons are provided', () => {
    setDefaults({
      auxButton: {
        outlined: true,
      },
    })

    const command = new NormalizeButtonsCommand()
    const result = command.meta.Handler().execute(command)

    // Assert that the result has the expected properties/values
    expect(result).toEqual({
      main: {
        class: '',
        isLoading: false,
        hidden: false,
        label: '{{ Create new | Update record }}',
      },
      aux: {
        class: '',
        hidden: false,
        isLoading: false,
        outlined: true,
        label: 'Cancel',
      },
    })

    // Additional assertions for more specific properties/values
    expect(result.main.class).toBe('')
    expect(result.aux.class).toBe('')
  })

  it.concurrent('should return normalized buttons with overridden properties', () => {
    const LABEL = '{{ Create | Update }}'
    const CANCEL_ICON = 'cancel-icon'
    const IS_LOADING = true

    const buttons = {
      main: {
        isLoading: IS_LOADING,
        hidden: false,
        label: LABEL,
      },
      aux: {
        hidden: false,
        icon: CANCEL_ICON,
      },
    }

    const command = new NormalizeButtonsCommand(buttons)

    const result = command.meta.Handler().execute(command)

    expect(result.main.isLoading).toBe(IS_LOADING)
    expect(result.main.label).toBe(LABEL)
    expect(result.aux.icon).toBe(CANCEL_ICON)
  })
})
