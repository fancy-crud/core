import { effect } from '@vue/reactivity';
import { Actions, Form, FormModes, NormalizedFieldStructure } from '@/types';
import _ from 'lodash';

const setFocused = (field: NormalizedFieldStructure) => () => {
  field.wasFocused = true
}


export const setInputTextModelValue = (field: NormalizedFieldStructure, value: any) => {
  field.modelValue = value
}

export const setInputSelectModelValue = (field: NormalizedFieldStructure, value: any) => {
  field.modelValue = field.options?.find(
    (item: any) => item[field.optionValue || ''] == value
  )
}

export const setInputCheckboxModelValue = (field: NormalizedFieldStructure, value: any) => {
  const singleValue = () => {
    field.modelValue = value
  }

  const multipleValue = () => {
    const indexInModelValue = (field.modelValue as unknown[]).findIndex(
      (item: any) => _.isEqual(item, value)
    )

    if ((field.modelValue as unknown[]).includes(value)) {
      (field.modelValue as unknown[]).splice(indexInModelValue, 1)
      field.modelValue = [...field.modelValue as unknown[]]
    }
    else {
      field.modelValue = [..._.cloneDeep(field.modelValue as unknown[]), value]
    }
  }

  if (Array.isArray(field.options) && Array.isArray(field.modelValue)) {
    multipleValue()
    return
  }

  singleValue()
}

export const setInputFileModelValue = (field: NormalizedFieldStructure, files: any) => {
  const _files = []

  if (!files) return

  for (let index = 0; index < files.length; index++) {
    _files.push(files[index])
  }
  
  field.modelValue = _files
}

export const setInputRadioModelValue = (field: NormalizedFieldStructure, value: any) => {
  field.modelValue = value
}

export const togglePasswordVisibility = (field: NormalizedFieldStructure) => {
  field.showPassword = !field.showPassword
}

export const actions: any = {
  'text': { onInput: setInputTextModelValue },
  'textarea': { onInput: setInputTextModelValue },
  'color': { onChange: setInputTextModelValue, onInput: null },
  'date': { onInput: setInputTextModelValue },
  'select': { onInput: setInputSelectModelValue },
  'radio': { onInput: setInputSelectModelValue },
  'checkbox': { onInput: setInputCheckboxModelValue },
  'file': { onChange: setInputFileModelValue },
  'image': { onChange: setInputFileModelValue },
}

export const NO_ACTION = () => null

export function setFormMode(form: Form, mode: FormModes) {
  form.settings.mode = mode
}

export function setFormRecord(form: Form, record: unknown) {
  Object.assign(form, { record })
}

export function useSetModelValue(field: NormalizedFieldStructure, callback: () => void) {
  const modelValue = ref<unknown>(field.modelValue)

  effect(() => modelValue.value, { scheduler: () => {
    field.errors = []
    callback()
  } })

  effect(() => field.modelValue, {
    scheduler: () => modelValue.value = field.modelValue
  })

  return modelValue
}