<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>

    <div class="relative">
      <input
        v-model="modelValue"
        v-bind="field"
        :class="className"
        :type="inputType"
      >
      <button
        @click="togglePasswordVisibility(field)"
        class="absolute top-0 right-0 rounded-l-none btn"
        type="button"
      >
        <i
          class="mdi"
          :class="iconVisibility"
        />
      </button>
    </div>

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import type { NormalizedFieldStructure } from '@/types'
import { setInputTextModelValue, togglePasswordVisibility, useSetModelValue } from '@/composables'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

const modelValue = useSetModelValue(props.field, () => {
  setInputTextModelValue(props.field, modelValue.value)
  emit('update:modelValue', modelValue.value)
})

const iconVisibility = computed(() => {
  return props.field.showPassword ? 'mdi-eye' : 'mdi-eye-off'
})

const inputType = computed(() => props.field.showPassword ? 'text' : 'password')

const className = computed(() => `w-full ${props.field.class}`)
</script>
