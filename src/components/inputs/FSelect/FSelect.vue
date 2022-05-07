<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>

    <select
      @change="setModelValue"
      :class="field.class"
    >
      <option
        disabled
        selected
      >
        {{ field.placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option[optionValue]"
        :selected="_.isEqual(option, field.option)"
        :value="option[optionValue]"
      >
        {{ option[optionLabel] }}
      </option>
    </select>

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'
import { setInputSelectModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const optionLabel = computed(() => props.field.optionLabel || '')
const optionValue = computed(() => props.field.optionValue || '')
const options = computed(() => {
  return _.cloneDeep(props.field.options)
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const setModelValue = (e: any) => {
  const value = e.target.value
  setInputSelectModelValue(props.field, value)
  emit('update:modelValue', props.field.modelValue)
}

</script>
