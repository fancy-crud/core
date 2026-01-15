<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <Select 
      v-bind="selectProps"
      v-model="modelValue"
      :options="selectOptions"
      optionLabel="label"
      optionValue="value"
      :class="inputClass"
      :style="(props.field as any).style"
      :showClear="showClearValue"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwSelect - Select/Dropdown wrapper for PrimeVue
 * 
 * Supports all PrimeVue Select options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/select/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   country: {
 *     type: FieldType.select,
 *     label: 'Country',
 *     options: [['USA', 'us'], ['Canada', 'ca']],
 *     
 *     // PrimeVue options
 *     clearable: true,
 *     filter: true,
 *     filterPlaceholder: 'Search...',
 *     
 *     // Styling
 *     class: 'animate-fadein border-primary',
 *     style: { minWidth: '200px' },
 *     panelClass: 'bg-surface-50',
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import Select from 'primevue/select'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import { useSelectField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedSelectField
}>()

const { vmodel, hintText, options, hasFieldErrors } = useSelectField(props)

const modelValue = computed({
  get: () => vmodel.value.modelValue,
  set: (val) => {
    // This setter is called by the v-model binding
    // Extract value if it's an object with value property (PrimeVue may return the whole option object)
    // This handles cases where PrimeVue returns {value: 'true', label: 'Validados'} instead of just 'true'
    let actualValue = val
    if (val !== null && val !== undefined && typeof val === 'object' && 'value' in val) {
      actualValue = val.value
    }
    vmodel.value['onUpdate:modelValue'](actualValue)
  }
})

const selectOptions = computed(() => {
  // options come from useSelectField as [label, value] tuples
  // We convert them to {label, value} objects for PrimeVue
  // This ensures consistent structure regardless of Django response or manual definition
  return options.value.map(([label, value]: any) => ({
    label: String(label),
    value, // Keep original value type (string, number, boolean, etc.)
  }))
})

const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})

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

const showClearValue = computed(() => {
  const field = props.field as any
  return toBoolean(field.clearable || field.showClear)
})

const selectProps = computed(() => {
  const field = props.field as any
  return {
    placeholder: field.placeholder,
    disabled: toBoolean(field.disabled),
    filter: toBoolean(field.filter),
    filterPlaceholder: field.filterPlaceholder,
    filterMatchMode: field.filterMatchMode,
    loading: toBoolean(field.loading),
    editable: toBoolean(field.editable),
    virtualScrollerOptions: field.virtualScrollerOptions,
    autoFilterFocus: toBoolean(field.autoFilterFocus),
    resetFilterOnHide: toBoolean(field.resetFilterOnHide),
    emptyMessage: field.emptyMessage,
    emptyFilterMessage: field.emptyFilterMessage,
    appendTo: field.appendTo,
    panelClass: field.panelClass,
    size: field.size,
    variant: field.variant,
    fluid: toBoolean(field.fluid),
  }
})
</script>
