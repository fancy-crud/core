import { NormalizeButtonsCommand } from '@/forms/capabilities'

describe('NormalizeButtons', () => {
  it.concurrent('should return normalized buttons when no buttons are provided and no defaults', () => {
    const command = new NormalizeButtonsCommand()
    const result = new command.meta.Handler().execute(command)

    // Assert that the result has the expected properties/values
    expect(result).toEqual({
      main: {
        class: '',
        isLoading: false,
        icon: '',
        label: {
          create: 'Create new',
          update: 'Update record',
        },
      },
      aux: {
        class: '',
        isLoading: false,
        icon: '',
        label: {
          create: 'Cancel',
          update: 'Cancel',
        },
      },
    })

    // Additional assertions for more specific properties/values
    expect(result.main.class).toBe('')
    expect(result.aux.class).toBe('')
  })

  it.concurrent('should return normalized buttons with defaults when no buttons are provided', () => {
    setDefaultClasses({
      auxButton: {
        outlined: true,
      },
    })

    const command = new NormalizeButtonsCommand()
    const result = new command.meta.Handler().execute(command)

    // Assert that the result has the expected properties/values
    expect(result).toEqual({
      main: {
        class: '',
        isLoading: false,
        icon: '',
        label: {
          create: 'Create new',
          update: 'Update record',
        },
      },
      aux: {
        class: '',
        isLoading: false,
        icon: '',
        outlined: true,
        label: {
          create: 'Cancel',
          update: 'Cancel',
        },
      },
    })

    // Additional assertions for more specific properties/values
    expect(result.main.class).toBe('')
    expect(result.aux.class).toBe('')
  })

  it.concurrent('should return normalized buttons with overridden properties', () => {
    const CREATE_LABEL = 'Create'
    const UPDATE_LABEL = 'Update'
    const CANCEL_ICON = 'cancel-icon'
    const IS_LOADING = true

    const buttons = {
      main: {
        isLoading: IS_LOADING,
        label: {
          create: CREATE_LABEL,
          update: UPDATE_LABEL,
        },
      },
      aux: {
        icon: CANCEL_ICON,
      },
    }

    const command = new NormalizeButtonsCommand(buttons)

    const result = new command.meta.Handler().execute(command)

    expect(result.main.isLoading).toBe(IS_LOADING)
    expect(result.main.label.create).toBe(CREATE_LABEL)
    expect(result.aux.icon).toBe(CANCEL_ICON)
  })
})
