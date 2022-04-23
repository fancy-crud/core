<template>
  <label class="label cursor-pointer justify-start">
    <input
      v-model="modelValue"
      v-bind="field"
    >
    <span class="pl-4">{{ field.label }}</span>
  </label>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'
import { setInputCheckboxModelValue, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const modelValue = useSetModelValue(props.field, () => {
  setInputCheckboxModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})

</script>
