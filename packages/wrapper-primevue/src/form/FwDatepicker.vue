<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <DatePicker 
      v-bind="props.field"
      v-model="modelValue"
      :class="inputClass"
      :invalid="hasFieldErrors"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwDatepicker - DatePicker wrapper for PrimeVue
 * 
 * Supports all PrimeVue DatePicker options:
 * @see https://primevue.org/datepicker/
 * 
 * @example
 * ```ts
 * const fields = {
 *   birthDate: {
 *     type: FieldType.datepicker,
 *     label: 'Birth Date',
 *     
 *     // PrimeVue options (pass any DatePicker prop)
 *     dateFormat: 'dd/mm/yy',
 *     showIcon: true,
 *     showTime: true,      // Enable time selection (datetime mode)
 *     showButtonBar: true,
 *     hourFormat: '24',
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

const { hintText, vmodel, hasFieldErrors } = useDatepickerField<any>(props)

// Helper function to normalize boolean values
const toBoolean = (value: any): boolean | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim()
    if (normalized === 'true') return true
    if (normalized === 'false') return false
  }
  return Boolean(value)
}

// Helper function to convert ISO string to Date object
const toDateObject = (value: any): Date | null | undefined => {
  if (value === null || value === undefined) return value
  if (value instanceof Date) return value
  if (typeof value === 'string') {
    try {
      const date = new Date(value)
      return isNaN(date.getTime()) ? null : date
    } catch {
      return null
    }
  }
  return null
}

// Helper function to convert Date object to ISO string
const toISOString = (value: any): string | null | undefined => {
  if (value === null || value === undefined) return value
  if (value instanceof Date) {
    try {
      return value.toISOString()
    } catch {
      return null
    }
  }
  if (typeof value === 'string') return value
  return null
}

// Computed property to handle date conversion
const dateValue = computed({
  get: () => {
    // Convert ISO string from backend to Date object for PrimeVue
    return toDateObject(vmodel.value.modelValue)
  },
  set: (val) => {
    // Convert Date object back to ISO string for backend
    const isoValue = toISOString(val)
    vmodel.value['onUpdate:modelValue'](isoValue)
  }
})

const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})

const showClearValue = computed(() => {
  const field = props.field as any
  return toBoolean(field.clearable || field.showClear)
})

const datePickerProps = computed(() => {
  const field = props.field as any
  return {
    placeholder: field.placeholder,
    disabled: toBoolean(field.disabled),
    readonly: toBoolean(field.readonly),
    showIcon: toBoolean(field.showIcon),
    showTime: toBoolean(field.showTime),
    showButtonBar: toBoolean(field.showButtonBar),
    showOnFocus: toBoolean(field.showOnFocus),
    iconDisplay: field.iconDisplay,
    dateFormat: field.dateFormat,
    hourFormat: field.hourFormat || '24',
    timeOnly: toBoolean(field.timeOnly),
    numberOfMonths: field.numberOfMonths,
    view: field.view,
    minDate: toDateObject(field.minDate),
    maxDate: toDateObject(field.maxDate),
    disabledDates: field.disabledDates?.map(toDateObject),
    disabledDays: field.disabledDays,
    inline: toBoolean(field.inline),
    selectionMode: field.selectionMode,
    panelClass: field.panelClass,
    appendTo: field.appendTo,
    fluid: toBoolean(field.fluid),
    variant: field.variant,
    size: field.size,
    invalid: hasFieldErrors.value,
  }
})
</script>
