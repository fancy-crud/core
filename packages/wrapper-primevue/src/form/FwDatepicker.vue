<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <DatePicker 
      v-model="modelValue"
      v-bind="props.field"
      :class="inputClass"
      :style="(props.field as any).style"
      :showClear="(props.field as any).clearable || (props.field as any).showClear"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwDatepicker - DatePicker wrapper for PrimeVue
 * 
 * Supports all PrimeVue DatePicker options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/datepicker/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   birthDate: {
 *     type: FieldType.datepicker,
 *     label: 'Birth Date',
 *     
 *     // PrimeVue options
 *     dateFormat: 'dd/mm/yy',
 *     showIcon: true,
 *     showTime: true,
 *     showButtonBar: true,
 *     
 *     // Styling
 *     class: 'animate-fadein',
 *     style: { maxWidth: '300px' },
 *     panelClass: 'bg-surface-0',
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import DatePicker from 'primevue/datepicker'
import type { NormalizedDatepickerField } from '@fancy-crud/vue'
import { useDatepickerField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedDatepickerField
}>()

const { hintText, modelValue, hasFieldErrors } = useDatepickerField<any>(props)

const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})
</script>
