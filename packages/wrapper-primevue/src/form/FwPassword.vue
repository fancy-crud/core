<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <Password 
      v-bind="props.field" 
      v-model="modelValue" 
      :class="inputClass"
      :style="(props.field as any).style"
      :inputClass="(props.field as any).inputClass || 'w-full'"
      :feedback="(props.field as any).feedback ?? false"
      :toggleMask="(props.field as any).toggleMask ?? true"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwPassword - Password input wrapper for PrimeVue
 * 
 * Supports all PrimeVue Password options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/password/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   password: {
 *     type: FieldType.password,
 *     label: 'Password',
 *     
 *     // PrimeVue options
 *     toggleMask: true,
 *     feedback: true,
 *     promptLabel: 'Enter password',
 *     weakLabel: 'Weak',
 *     mediumLabel: 'Medium', 
 *     strongLabel: 'Strong',
 *     
 *     // Styling
 *     class: 'w-full animate-fadein',
 *     inputClass: 'w-full bg-surface-50',
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import Password from 'primevue/password'
import type { NormalizedPasswordField } from '@fancy-crud/vue'
import { usePasswordField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedPasswordField
}>()

const { hintText, modelValue, hasFieldErrors } = usePasswordField(props)

const inputClass = computed(() => {
  const field = props.field as any
  const baseClasses = ['w-full']
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...baseClasses, ...userClasses, ...invalidClass]
})
</script>
