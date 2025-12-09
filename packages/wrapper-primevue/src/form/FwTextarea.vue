<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <Textarea 
      v-bind="props.field" 
      v-model="modelValue" 
      :class="inputClass"
      :style="(props.field as any).style"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwTextarea - Textarea wrapper for PrimeVue
 * 
 * Supports all PrimeVue Textarea options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/textarea/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   description: {
 *     type: FieldType.textarea,
 *     label: 'Description',
 *     
 *     // PrimeVue options
 *     rows: 5,
 *     cols: 30,
 *     autoResize: true,
 *     
 *     // Styling
 *     class: 'bg-surface-50',
 *     style: { minHeight: '100px' },
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import Textarea from 'primevue/textarea'
import type { NormalizedTextareaField } from '@fancy-crud/vue'
import { useTextareaField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedTextareaField
}>()

const { hintText, modelValue, hasFieldErrors } = useTextareaField(props)

const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})
</script>
