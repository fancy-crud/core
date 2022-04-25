<template>
  <label
    v-for="(option, i) in options"
    :key="i"
    class="label cursor-pointer flex items-center justify-start py-2"
    v-bind="$attrs"
  >
    <input
      :id="field.id"
      v-bind="field"
      @change="setModelValue(option)"
    >
    <span class="pl-4">{{ option[optionLabel] }}</span>
  </label>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'
import { setInputCheckboxModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const options = computed(() => _.cloneDeep(props.field.options))
const optionLabel = ref(props.field.optionLabel || '')

const setModelValue = (value: any) => {
  setInputCheckboxModelValue(props.field, value)
  emit('update:modelValue', value)
}

</script>
