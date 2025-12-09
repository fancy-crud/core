<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <InputText 
      v-bind="props.field" 
      v-model="modelValue" 
      :class="inputClass"
      :style="(props.field as any).style"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwText - Text input wrapper for PrimeVue
 * 
 * Supports all PrimeVue InputText options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/inputtext/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   username: {
 *     type: FieldType.text,
 *     label: 'Username',
 *     placeholder: 'Enter username',
 *     
 *     // PrimeVue options
 *     size: 'large',
 *     variant: 'filled',
 *     fluid: true,
 *     
 *     // Styling - Tailwind classes
 *     class: 'bg-primary-50 border-primary-300',
 *     style: { borderRadius: '12px' },
 *     
 *     // Animations
 *     class: 'animate-fadein animate-duration-300',
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import type { NormalizedTextField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedTextField
}>()

const { hintText, modelValue, hasFieldErrors } = useTextField<any>(props)

// Combine base classes with user-provided classes
const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})
</script>
