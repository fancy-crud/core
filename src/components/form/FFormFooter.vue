<template>
  <footer class="px-3">
    <slot v-bind="{ mainButton, auxButton, getLabel }">
      <f-button
        @click="mainOnClick"
        :label="getLabel(mainButton)"
        :icon="mainButton.icon"
        :class="mainButton.class"
        class="bg-primary-500 text-white rounded-lg hover:shadow-md hover:shadow-primary-300"
      />
      <f-button
        @click="auxOnClick"
        :label="getLabel(auxButton)"
        :icon="auxButton.icon"
        :class="auxButton.class"
        class="border ml-4 rounded-lg bg-transparent text-primary-500 border-primary-500 px-8 hover:bg-primary-50"
      />
    </slot>
  </footer>
</template>

<script lang="ts" setup>
import type { AxiosError, AxiosResponse } from 'axios'
import { FormModes } from '@/types'
import type { Button, Form } from '@/types'
import { triggerCreateOrUpdate } from '@/composables'

const props = defineProps<{
  form: Form
}>()

const emit = defineEmits<{
  (e: 'create', response: AxiosResponse): void
  (e: 'update', response: AxiosResponse): void
  (e: 'create-error', response?: AxiosResponse): void
  (e: 'update-error', response?: AxiosResponse): void
}>()

const mainButton = computed(() => props.form.settings.buttons.main)
const auxButton = computed(() => props.form.settings.buttons.aux)

const getLabel = computed(() => (button: Button) => {
  return props.form.settings.mode === FormModes.CREATE_MODE ? button.label?.create : button.label?.update
})

const mainOnClick = async() => {
  if (typeof props.form.settings.buttons.main.onClick === 'function') {
    props.form.settings.buttons.main.onClick()
    return
  }

  let result: {
    isActionSucceed: boolean
    value: AxiosResponse
  }

  const emitEvent = (response: AxiosResponse) => {
    if (props.form.settings.mode === FormModes.CREATE_MODE) emit('create', response)
    else emit('update', response)
  }

  const emitErrorEvent = (response?: AxiosResponse) => {
    if (props.form.settings.mode === FormModes.CREATE_MODE) emit('create-error', response)
    else emit('update-error', response)
  }

  try {
    result = await triggerCreateOrUpdate(props.form)
  }
  catch (err) {
    const error = err as { value: AxiosError }
    emitErrorEvent(error.value.response)
    return
  }

  emitEvent(result.value)
  // resetModelValue(form, cloneForm)
}

const auxOnClick = () => {
  if (typeof props.form.settings.buttons.aux.onClick === 'function')
    props.form.settings.buttons.aux.onClick()

  // resetModelValue(props.form, cloneForm)
}
</script>
