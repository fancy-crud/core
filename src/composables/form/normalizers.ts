import {
  Fields,
  FieldStructure,
  NormalizedFields,
  NormalizedFieldStructure,
  Buttons,
  Title,
  Settings,
  FormModes,
  NormalizedSettings,
  NormalizedButtons
} from "@/types"
// import locale from "@/locale"
import { parseRules } from "./rules"
// import {
//   FCheckbox,
//   FColor,
//   FInput,
//   FInputFile,
//   FInputPassword,
//   FRadio,
//   FSelect,
//   FTextarea,
//   // FDate
// } from "/components"

type ControlList = {
  [k: string]: {
    class: string
  }
}

const locale = { t: (s: string) => s }

const controls: ControlList = {
  text: {
    class: "input input-bordered animation-none no-animation",
  },
  date: {
    class: "input input-bordered animation-none no-animation",
  },
  password: {
    class: "input input-bordered w-full animation-none no-animation",
  },
  select: {
    class: "select select-bordered w-full no-animation",
  },
  checkbox: {
    class: "checkbox no-animation",
  },
  radio: {
    class: "radio no-animation",
  },
  textarea: {
    class: "textarea textarea-bordered h-24 no-animation",
  },
  color: {
    class: "absolute outline-0 top-1/2 -translate-y-1/2 right-5",
  },
  file: {
    class: "absolute outline-0 top-1/2 -translate-y-1/2 opacity-0 z-10 w-full",
  },
  image: {
    class: "absolute outline-0 top-1/2 -translate-y-1/2 opacity-0 z-10 w-full",
  },
}

export function createDefaultKeys(
  fieldKey: string,
  field: FieldStructure
): NormalizedFieldStructure {
  const _field = Object.assign(
    {},
    {
      id: `field-${fieldKey}-control`,
      modelKey: fieldKey,
      name: fieldKey,
      type: "text",
      rules: [],
      errors: [],
      wasFocused: false,
      modelValue: field.multiple ? [] : null,
      showPassword: false,
      class: "",
      ref: null,
      // RenderField: controls[field.type || "text"].control,
      onInput: (e: Event) => e,
      ...field,
    }
  )

  if (_field.type === "autocomplete") {
    _field.valueString = ""
  }

  if (_field.url && !_field.options) {
    _field.options = []
  }

  _field.class = `${controls[_field.type || "text"].class} ${_field.class}`.trim()

  return _field
}

export function normalizeFormFields(fields: Fields): NormalizedFields {
  const normalizedFields = {} as NormalizedFields

  Object.entries(fields).forEach(([fieldKey, field]) => {
    const _field = createDefaultKeys(fieldKey, field)

    parseRules(_field.rules)

    Object.assign(normalizedFields, {
      [fieldKey]: _field,
    })
  })

  return normalizedFields
}

export function normalizeButtons(buttons?: Buttons) {
  const defaultMainButton = {
    label: {
      create: locale.t("Create new"),
      update: locale.t("Update record"),
    },
  }

  const defaultAuxButton = {
    class: "btn btn-outline animate-none ml-3",
    label: {
      create: locale.t("Cancel"),
      update: locale.t("Cancel"),
    },
  }

  const mainButton = buttons ? buttons.main || {} : {}
  const auxButton = buttons ? buttons.aux || {} : {}

  const normalizedButtons = Object.assign(
    {},
    {
      main: {
        ...defaultMainButton,
        ...mainButton,
      },
      aux: {
        ...defaultAuxButton,
        ...auxButton,
      },
    }
  ) as NormalizedButtons

  if (typeof normalizedButtons.main.label === "object") {
    normalizedButtons.main.label = {
      ...defaultMainButton.label,
      ...normalizedButtons.main.label,
    }
  }

  if (typeof normalizedButtons.aux.label === "object") {
    normalizedButtons.aux.label = {
      ...defaultAuxButton.label,
      ...normalizedButtons.aux.label,
    }
  }

  return normalizedButtons
}

export function normalizeTitle(title?: string | Title) {
  const defaultTitle = {
    create: locale.t("Create new element"),
    update: locale.t("Update element"),
  }

  if (!title) return defaultTitle

  let _title: string | typeof defaultTitle

  if (typeof title === "string") {
    _title = title
  } else {
    _title = {
      ...defaultTitle,
      ...title,
    }
  }

  return _title
}

export function normalizeFormSettings(settings: Settings): NormalizedSettings {
  const _settings = Object.assign(settings, {
    mode: settings.mode || FormModes.CREATE_MODE,
    lookupField: settings.lookupField || "id",
    title: normalizeTitle(settings.title),
    buttons: normalizeButtons(settings.buttons),
    isValid: false,
  })

  return _settings
}
