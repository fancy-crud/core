<template>
  <label
    v-for="(option, i) in options"
    :key="i"
    class="label cursor-pointer flex items-center justify-start py-2"
    :class="[errorStyles.textColor]"
    v-bind="$attrs"
  >
    <input
      @change="setModelValue(option)"
      v-bind="field"
      class="cursor-pointer"
      :checked="isChecked(option)"
      :id="`${field.id}-${i}`"
    >
    <span class="pl-4">{{ getOptionLabel(option) }}</span>
  </label>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'
import { setInputCheckboxModelValue, useErrorStyles } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const options = computed(() => _.cloneDeep(props.field.options))
const optionLabel = ref(props.field.optionLabel || '')

const errorStyles = useErrorStyles(props.field)

function setModelValue(value: any) {
  setInputCheckboxModelValue(props.field, value)
  emit('update:modelValue', value)
}

function getOptionLabel(option: any) {
  if (typeof option !== 'object')
    return option

  return option[optionLabel.value]
}

function isChecked(option: unknown) {
  return (props.field.modelValue as unknown[]).some(_option => _.isEqual(_option, option))
}
</script>
