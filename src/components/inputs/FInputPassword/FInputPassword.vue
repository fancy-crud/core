<template>
  <f-control-wrap>
    <f-control-label :class="[errorStyles.textColor]">
      {{ field.label }}
    </f-control-label>

    <div class="relative">
      <input
        v-model="modelValue"
        v-bind="field"
        :class="[errorStyles.borderColor]"
        :type="inputType"
      >
      <f-button
        @click="togglePasswordVisibility(field)"
        class="absolute top-1/2 right-0 rounded-r-md p-3 -translate-y-[50%]"
        :icon="iconVisibility"
      />
    </div>

    <f-control-hint-message />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import type { NormalizedFieldStructure } from '@/types'
import { setInputTextModelValue, togglePasswordVisibility, useErrorStyles, useSetModelValue } from '@/composables'

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

const iconVisibility = computed(() => {
  return props.field.showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'
})

const inputType = computed(() => props.field.showPassword ? 'text' : 'password')
</script>
