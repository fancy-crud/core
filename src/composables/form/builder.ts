import _ from "lodash"
import { reactive } from "@vue/reactivity"

import { normalizeFormFields, normalizeFormSettings } from "./normalizers"
import { actions, NO_ACTION } from "./actions"
import { validateRules } from "./rules"
import {
  NormalizedFieldStructure,
  NormalizedFields,
  CreateForm,
  IFormRecord,
  FormModes,
  Form,
} from "@/types"

export function fillFieldsWithRecordValues(fields: NormalizedFields, record: IFormRecord) {
  if (Object.keys(record || {}).length === 0) return

  Object.entries(fields).forEach(([fieldKey, field]) => {
    if (field.type !== "file" && field.type !== "image") {
      field.modelValue = fieldKey
        .split(".")
        .reduce((accumulator, currentValue) => accumulator[currentValue], record)
    } else {
      const fileUrl = fieldKey
        .split(".")
        .reduce((accumulator, currentValue) => accumulator[currentValue], record)

      field.fileUrl = String(fileUrl)
    }
  })
}

export function getFormData(form: { fields: NormalizedFields }) {
  type Handle = { fieldKey: string; field: NormalizedFieldStructure }

  const metadata: { [key: string]: unknown } = {}
  let formData: FormData | null = null

  const handleListValues = ({ fieldKey, field }: Handle) => {
    const formKey = field.modelKey || `${fieldKey}_id`

    const addFormDataValue = (value: any) => {
      const optionValue = String(field.optionValue)
      const formValue = value[optionValue]

      if (field.multiple) {
        metadata[formKey] = !Array.isArray(metadata[formKey])
          ? [formValue]
          : (metadata[formKey] as Array<unknown>).push(formValue)
      } else {
        metadata[formKey] = formValue
      }
    }

    if (!field.modelValue) {
      metadata[formKey] = field.modelValue
      return
    }

    if (!field.optionValue) {
      throw new Error(`'${fieldKey}' field require optionValue property`)
    }

    if (field.multiple) {
      ;(field.modelValue as Array<any>).forEach(addFormDataValue)
      return
    }

    addFormDataValue(field.modelValue as any)
  }

  const handleFileValue = ({ fieldKey, field }: Handle) => {
    const formKey = field.modelKey || fieldKey

    if (!formData) {
      formData = new FormData()
    }

    if (Array.isArray(field.modelValue)) {
      if (field.multiple) {
        field.modelValue.forEach((file: File) => formData?.append(formKey, file))
      } else {
        formData.set(formKey, field.modelValue[0])
      }
      return
    }
    formData.set(formKey, field.modelValue as any)
  }

  const handleValue = ({ fieldKey, field }: Handle) => {
    let value: unknown = field.modelValue
    metadata[field.modelKey || fieldKey] = value
  }

  Object.entries(form.fields).forEach(([fieldKey, field]) => {
    if (field.url || field.optionValue) {
      handleListValues({ fieldKey, field })
      return
    }

    const isFileOrImage = Array("file", "image").some((type) => field.type === type)

    if (isFileOrImage && field.modelValue) {
      handleFileValue({ fieldKey, field })
    } else {
      handleValue({ fieldKey, field })
    }

    field.errors = []
  })

  return { jsonForm: metadata, formData }
}

export async function validateForm(form: Form, _fieldKey?: string) {
  const formMode = form.settings.mode
  let isValid = true

  if (_fieldKey) {
    isValid = validateRules(form.fields[_fieldKey])

    if (!isValid) return
  }

  Object.entries(form.fields).forEach(([fieldKey, field]) => {
    const skipField =
      (formMode === FormModes.CREATE_MODE && field.updateOnly) ||
      (formMode === FormModes.UPDATE_MODE && field.createOnly)

    if (!field.rules.length || skipField) {
      field.errors = []
      return
    }

    const result = validateRules(field, !(fieldKey === _fieldKey))

    if (isValid) {
      isValid = result
    }
  })

  if (isValid !== form.settings.isValid) {
    form.settings.isValid = isValid
  }
}

// export function activeRenderingFieldWatcher(form: Form) {
//   Object.entries(form.fields).forEach(([fieldKey, field]) => {
//     effect(() => {
//       const ControlGenerator = field.RenderField({
//         fieldKey,
//         field,
//         ...field,
//       }) as HTMLElement

//       if (field.ref) {
//         const items: Node[] = []
//         const element = field.ref as HTMLElement
//         const selector = field.type === "textarea" ? "textarea" : "input"

//         const focusedElement = document.activeElement
//         const beforeReplaceInput = element.querySelector(selector)
//         const execFocus = beforeReplaceInput === focusedElement

//         ControlGenerator.childNodes.forEach((item) => items.push(item))
//         element.replaceChildren(...items)

//         const _input = element.querySelector(selector)

//         if (_input && field.onFocus && execFocus) {
//           _input.focus()
//         }
//       }
//     })

//     effect(() => field.modelValue, {
//       scheduler: () => {
//         if (validateRules(field)) {
//           validateForm(form)
//         }
//       },
//     })
//   })
// }

export function setEventHandler(form: Form) {
  // Object.values(form.fields).forEach((field) => {
  //   const handler = actions[field.type] || actions["text"]

  //   if (handler) {
  //     const onInput = handler.onInput ? handler.onInput.call(null, field) : NO_ACTION
  //     const onChange = handler.onChange ? handler.onChange.call(null, field) : NO_ACTION

  //     Object.assign(field, { onInput, onChange })
  //   }
  // })
}

export function resetModelValue(form: Form, cloneForm: Form) {
  Object.entries(cloneForm.fields).forEach(([fieldKey, field]) => {
    Object.assign(form.fields[fieldKey], {
      modelValue: field.modelValue,
      errors: [],
    })
  })
}

export function createForm(args: CreateForm) {
  const { fields, settings, record } = args

  let _fields = normalizeFormFields(fields)

  const _settings = normalizeFormSettings(settings)

  const _form = Object.assign(
    {},
    {
      ...args,
      fields: _fields,
      settings: _settings,
    }
  )

  const form = reactive<Form>(_form)

  // const triggerFormUpdateMode = () => {
  //   if (form.settings.mode === FormModes.UPDATE_MODE && form.record) {
  //     fillFieldsWithRecordValues(form.fields, form.record)
  //   }
  // }

  // setEventHandler(form)
  // activeRenderingFieldWatcher(form)
  // effect(triggerFormUpdateMode)
  // validateForm(form)

  return form
}
