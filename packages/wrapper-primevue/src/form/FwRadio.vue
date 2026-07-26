<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <div :class="containerClass" :style="(props.field as any).style">
      <div v-for="([label, value], _index) in computedOptions" :key="_index" class="flex items-center">
        <RadioButton 
          v-model="modelValue" 
          :inputId="`radio-${fieldId}-${_index}`" 
          :value="value"
          :disabled="(props.field as any).disabled"
          :readonly="(props.field as any).readonly"
          :invalid="hasFieldErrors"
          :size="(props.field as any).size"
          :variant="(props.field as any).variant"
          :class="(props.field as any).inputClass"
        />
        <label :for="`radio-${fieldId}-${_index}`" class="ml-2" :class="(props.field as any).labelClass">
          {{ getLabel(label) }}
        </label>
      </div>
    </div>
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwRadio - RadioButton wrapper for PrimeVue
 * 
 * Supports all PrimeVue RadioButton options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/radiobutton/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   gender: {
 *     type: FieldType.radio,
 *     label: 'Gender',
 *     options: [['Male', 'M'], ['Female', 'F']],
 *     
 *     // Layout
 *     inRow: true,
 *     
 *     // Styling
 *     class: 'animate-fadein gap-6',
 *     inputClass: 'border-primary',
 *     labelClass: 'text-lg font-medium',
 *     style: { padding: '0.5rem' },
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import RadioButton from 'primevue/radiobutton'
import { useRadioField } from '@fancy-crud/vue'
import type { NormalizedRadioField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedRadioField
}>()

const { modelValue, hintText, options, hasFieldErrors } = useRadioField(props)

const fieldId = computed(() => String(props.formId).slice(7, 15))
const computedOptions = computed(() => options.value as any[][])

const containerClass = computed(() => {
  const field = props.field as any
  const baseClasses = field.inRow 
    ? ['flex', 'flex-wrap', 'gap-4'] 
    : ['flex', 'flex-col', 'gap-2']
  const userClasses = field.class ? [field.class] : []
  
  return [...baseClasses, ...userClasses]
})

function getLabel(label: unknown): string {
  return String(label)
}
</script>
