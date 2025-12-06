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
      :optionLabel="(props.field as any).displayLabel || 'label'"
      :optionValue="(props.field as any).displayValue || 'value'"
      :class="inputClass"
      :style="(props.field as any).style"
      :showClear="(props.field as any).clearable || (props.field as any).showClear"
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
  set: (val) => vmodel.value['onUpdate:modelValue'](val)
})

const selectOptions = computed(() => {
  return options.value.map(([label, value]: any) => ({
    label: String(label),
    value,
  }))
})

const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})

const selectProps = computed(() => {
  const field = props.field as any
  return {
    placeholder: field.placeholder,
    disabled: field.disabled,
    filter: field.filter,
    filterPlaceholder: field.filterPlaceholder,
    filterMatchMode: field.filterMatchMode,
    loading: field.loading,
    editable: field.editable,
    virtualScrollerOptions: field.virtualScrollerOptions,
    autoFilterFocus: field.autoFilterFocus,
    resetFilterOnHide: field.resetFilterOnHide,
    emptyMessage: field.emptyMessage,
    emptyFilterMessage: field.emptyFilterMessage,
    appendTo: field.appendTo,
    panelClass: field.panelClass,
    size: field.size,
    variant: field.variant,
    fluid: field.fluid,
  }
})
</script>
