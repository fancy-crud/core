<template>
  <label
    v-bind="$attrs"
    class="label cursor-pointer flex items-center justify-start py-3"
  >
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
