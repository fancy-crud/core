<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>

    <div class="relative input input-bordered p-4">
      <input
        @change="setModelValue"
        v-bind="field"
      >
      <p class="absolute left-0 w-full top-1/2 -translate-y-1/2 left-0 pl-3">
        {{ valueString }}
      </p>
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
import { setInputFileModelValue, useSetModelValue } from '@/composables'

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

const valueString = computed(() => {
  let _valueString = ''

  if (Array.isArray(props.field.modelValue))
    _valueString = props.field.modelValue.map(f => f.name).join(', ')

  return _valueString
})

</script>
