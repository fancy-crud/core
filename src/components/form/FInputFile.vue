<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>

    <div class="relative pr-4">
      <input
        @change="setModelValue"
        v-bind="field"
        class="block w-full text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
      >
      <f-input-file-preview
        :type="field.type"
        url="https://nyota.nl/wp-content/uploads/sites/84/2013/10/500x500.gif"
      />
    </div>

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'
import { setInputFileModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const setModelValue = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  setInputFileModelValue(props.field, files)
  emit('update:modelValue', props.field.modelValue)
}

</script>
