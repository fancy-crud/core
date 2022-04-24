<template>
  <footer class="px-3">
    <slot v-bind="{ mainButton, auxButton }">
      <f-button
        @click="mainOnClick"
        v-bind="mainButton"
        :mode="form.settings.mode"
        class="shadow-lg shadow-primary-200"
        loading
      />
      <f-button
        @click="auxOnClick"
        v-bind="auxButton"
        :mode="form.settings.mode"
        bg-color="white"
        class="border"
      />
    </slot>
  </footer>
</template>

<script lang="ts" setup>
import type { AxiosError, AxiosResponse } from 'axios'
import { FormModes } from '@/types'
import type { Form } from '@/types'
import { resetModelValue, triggerCreateOrUpdate } from '@/composables'
const props = defineProps<{
  form: Form
}>()

const emit = defineEmits<{
  (e: 'create', response: AxiosResponse): void
  (e: 'update', response: AxiosResponse): void
  (e: 'create-error', response: AxiosResponse): void
  (e: 'update-error', response: AxiosResponse): void
}>()

const mainOnClick = async() => {
  if (typeof props.form.settings.buttons.main.onClick === 'function') {
    props.form.settings.buttons.main.onClick()
    return
  }

  let result: {
    isActionSucceed: boolean
    value: AxiosResponse
  }

  const emitEventName = props.form.settings.mode === FormModes.CREATE_MODE ? 'create' : 'update'

  try {
    result = await triggerCreateOrUpdate(form)
  }
  catch (err) {
    const error = err as { value: AxiosError }
    emit(`${emitEventName}-error`, error.value.response)
    return
  }

  emit(emitEventName, result.value)
  resetModelValue(form, cloneForm)
}

const auxOnClick = () => {
  if (typeof props.form.settings.buttons.aux.onClick === 'function')
    props.form.settings.buttons.aux.onClick()

  // resetModelValue(props.form, cloneForm)
}

const mainButton = computed(() => props.form.settings.buttons.main)
const auxButton = computed(() => props.form.settings.buttons.aux)
</script>
