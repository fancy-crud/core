<template>
  <f-control-wrap>
    <f-control-label :class="[errorStyles.textColor]">
      {{ field.label }}
    </f-control-label>

    <input
      v-model="state.temporalModelValue"
      v-bind="field"
      :class="[errorStyles.borderColor]"
    >

    <f-control-hint-message />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import { provide, reactive, watch } from 'vue'
import type { NormalizedFieldStructure } from '@/types'
import { setInputTextModelValue, useErrorStyles, useSetModelValue } from '@/composables'

interface State {
  temporalModelValue: string
  timeout?: NodeJS.Timeout | null
}

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

provide('field', props.field)

const errorStyles = useErrorStyles(props.field)

const state: State = reactive({
  temporalModelValue: '',
  timeout: null,
})

const modelValue = useSetModelValue(props.field, () => {
  setInputTextModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})

watch(() => state.temporalModelValue, () => {
  if (!props.field.bounceTime) {
    modelValue.value = state.temporalModelValue
    return
  }

  if (state.timeout) {
    clearTimeout(state.timeout)
    state.timeout = null
  }

  state.timeout = setTimeout(() => {
    modelValue.value = state.temporalModelValue
  }, props.field.bounceTime)
})
</script>
