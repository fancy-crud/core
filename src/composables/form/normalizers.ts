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
import { parseRules } from "./rules"
import { getDefaults } from '../config'

const locale = { t: (s: string) => s }

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

  if (_field.url && (!_field.options || !Array.isArray(_field.options)))
    _field.options = []

  const defaults = getDefaults()
  const controlsClasses = defaults.classes
  type controlClassType = keyof typeof controlsClasses;
  _field.class = `${controlsClasses[_field.type as controlClassType || "text"]} ${_field.class}`.trim()

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
  const defaults = getDefaults()
  const defaultMainButton = {
    class: defaults.classes.mainButton,
    label: {
      create: locale.t("Create new"),
      update: locale.t("Update record"),
    },
  }

  const defaultAuxButton = {
    class: defaults.classes.auxButton,
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
