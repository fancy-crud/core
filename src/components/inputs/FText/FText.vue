<template>
  <div>
    <input
      v-model="state.modelValue"
      type="text"
      v-bind="$attrs"
    >
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue'

const props = defineProps<{
  modelValue?: string | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value?: string | null): void
}>()

const state = reactive({
  modelValue: props.modelValue,
})

watch(() => state.modelValue, () => {
  emits('update:modelValue', state.modelValue)
})

watch(() => props.modelValue, () => {
  if (props.modelValue !== state.modelValue)
    state.modelValue = props.modelValue
})
</script>
