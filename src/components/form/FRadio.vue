<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>

    <div :class="inRowDisplay">
      <label
        v-for="(option, i) in options"
        :key="i"
        class="label cursor-pointer justify-start pl-4"
      >
        <input
          v-bind="field"
          :id="`${field.id}-${i}`"
          @click="setModelValue(option)"
          :checked="_.isEqual(field.modelValue, option)"
        >
        <span class="pl-2">{{ option[optionLabel] }}</span>
      </label>
    </div>

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'
import { setInputRadioModelValue, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const inRowDisplay = computed(() => {
  return props.field.class.includes('in-row') ? 'flex flex-nowrap' : ''
})

const options = computed(() => _.cloneDeep(props.field.options))
const optionLabel = ref(props.field.optionLabel || '')
const optionValue = ref(props.field.optionValue || '')

const setModelValue = (value: any) => {
  setInputRadioModelValue(props.field, value)
  emit('update:modelValue', value)
}

</script>
