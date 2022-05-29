<template>
  <label
    v-bind="$attrs"
    class="label cursor-pointer flex items-center justify-start py-3"
  >
    <input
      v-model="modelValue"
      v-bind="field"
      class="cursor-pointer"
    >
    <span
      class="pl-4"
      :class="[errorStyles.textColor]"
    >
      {{ field.label }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'
import { setInputCheckboxModelValue, useErrorStyles, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const errorStyles = useErrorStyles(props.field)

const modelValue = useSetModelValue(props.field, () => {
  setInputCheckboxModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})
</script>
