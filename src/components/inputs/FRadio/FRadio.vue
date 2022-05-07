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
        class="cursor-pointer justify-start pl-4 flex items-center mb-4"
      >
        <input
          @click="setModelValue(option)"
          :checked="_.isEqual(field.modelValue, option)"
          v-bind="field"
          :id="`${field.id}-${i}`"
        >
        <span
          class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          :for="field.modelKey"
        >
          {{ option[optionLabel] }}
        </span>
      </label>
    </div>

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'
import { setInputRadioModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const inRowDisplay = computed(() => {
  return props.field.class.includes('in-row') ? 'in-row' : ''
})

const options = computed(() => _.cloneDeep(props.field.options))
const optionLabel = ref(props.field.optionLabel || '')

const setModelValue = (value: any) => {
  setInputRadioModelValue(props.field, value)
  emit('update:modelValue', value)
}

</script>

<style lang="sass">
.in-row
  display: flex
  flex-flow: row nowrap
</style>
