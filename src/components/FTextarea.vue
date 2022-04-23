<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>

    <textarea
      v-model="modelValue"
      v-bind="field"
    />

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'
import { setInputTextModelValue, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const modelValue = useSetModelValue(props.field, () => {
  setInputTextModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})

</script>
