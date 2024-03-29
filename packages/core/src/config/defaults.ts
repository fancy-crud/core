const defaults = ReturnObject<Record<string, { wrapper?: { class?: string }; class: string }>>({
  text: {
    wrapper: {
      class: '',
    },
    class: '',
  },
  modal: {
    class: '',
  },
  mainButton: {
    class: '',
  },
  auxButton: {
    class: '',
  },
  addButton: {
    class: '',
  },
  editButton: {
    class: '',
  },
  removeButton: {
    class: '',
  },
  dumpButton: {
    class: '',
  },
  confirmButton: {
    class: '',
  },
  cancelButton: {
    class: '',
  },
})

export function setDefaults(newDefaults: Record<string, any>) {
  Object.entries(newDefaults).forEach(([key, value]) => {
    if (defaults[key])
      Object.assign(defaults[key], value)
    else
      defaults[key] = value
  })
}

export function getDefaults() {
  return defaults
}

function ReturnObject<T extends Record<string, T[keyof T]>>(obj: T): Record<string, T[keyof T]> {
  return obj
}
