<template>
  <f-control-wrap>
    <f-control-label :class="[errorStyles.textColor]">
      {{ field.label }}
    </f-control-label>

    <div
      class="relative border rounded-lg p-3 flex row flex-nowrap justify-between items-center h-full max-h-10"
      :class="[errorStyles.borderColor]"
    >
      <span class="font-medium">
        {{ modelValue }}
      </span>
      <input
        v-model="modelValue"
        v-bind="field"
        class="absolute top-0 left-0 opacity-0 h-full w-full"
      >
      <span
        class="w-6 h-6 rounded-full"
        :style="selectedColor"
      />
    </div>

    <f-control-hint-message />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import type { NormalizedFieldStructure } from '@/types'
import { setInputTextModelValue, useErrorStyles, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

provide('field', props.field)

const errorStyles = useErrorStyles(props.field)
const modelValue = useSetModelValue(props.field, () => {
  setInputTextModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})

const selectedColor = computed(() => {
  return { backgroundColor: (modelValue.value as string) || '' }
})
</script>
