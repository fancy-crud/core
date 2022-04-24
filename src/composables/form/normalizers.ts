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

const locale = { t: (s: string) => s }

const controlsClasses  = {
  text: "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  date: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  password: "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  select: "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  checkbox: "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
  radio: "w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600",
  textarea: "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  color: "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  file: "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
  image: "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
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
  const defaultMainButton = {
    label: {
      create: locale.t("Create new"),
      update: locale.t("Update record"),
    },
  }

  const defaultAuxButton = {
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
