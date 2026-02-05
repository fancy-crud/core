<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <Select 
      v-bind="props.field"
      v-model="modelValue"
      :options="selectOptions"
      optionLabel="label"
      optionValue="value"
      :class="inputClass"
      :invalid="hasFieldErrors"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwSelect - Select/Dropdown wrapper for PrimeVue
 * 
 * Supports all PrimeVue Select options:
 * @see https://primevue.org/select/
 * 
 * @example
 * ```ts
 * const fields = {
 *   country: {
 *     type: FieldType.select,
 *     label: 'Country',
 *     options: [['USA', 'us'], ['Canada', 'ca']],
 *     
 *     // PrimeVue options (pass any DatePicker prop)
 *     filter: true,
 *     showClear: true,
 *     placeholder: 'Select country',
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
  set: (val: any) => {
    // Extract value if PrimeVue returns the whole option object instead of just the value
    // This handles edge cases where PrimeVue returns {value: 'true', label: 'Validated'} instead of just 'true'
    let actualValue = val
    if (val !== null && val !== undefined && typeof val === 'object' && 'value' in val) {
      actualValue = val.value
    }
    vmodel.value['onUpdate:modelValue'](actualValue)
  }
})

const selectOptions = computed(() => {
  // Transform [label, value] tuples from useSelectField to {label, value} objects for PrimeVue
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
</script>
