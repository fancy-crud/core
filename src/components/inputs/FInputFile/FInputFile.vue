<template>
  <f-control-wrap>
    <f-control-label :class="[errorStyles.textColor]">
      {{ field.label }}
    </f-control-label>

    <div class="relative pr-4">
      <input
        @change="setModelValue"
        v-bind="field"
        :class="[errorStyles.borderColor]"
        type="file"
      >
      <f-input-file-preview
        :type="field.type"
        url="https://nyota.nl/wp-content/uploads/sites/84/2013/10/500x500.gif"
      />
    </div>

    <f-control-hint-message />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import type { NormalizedFieldStructure } from '@/types'
import { setInputFileModelValue, useErrorStyles } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

provide('field', props.field)

const errorStyles = useErrorStyles(props.field)
const setModelValue = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  setInputFileModelValue(props.field, files)
  emit('update:modelValue', props.field.modelValue)
}
</script>
