<template>
  <fw-field 
    v-bind="(props.field as any).wrapper" 
    :label="(props.field as any).label" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <ColorPicker 
      v-bind="props.field" 
      v-model="modelValue" 
      :class="inputClass"
      :style="(props.field as any).style"
    />
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwColor - ColorPicker wrapper for PrimeVue
 * 
 * Supports all PrimeVue ColorPicker options plus Tailwind/PrimeVue styling:
 * @see https://primevue.org/colorpicker/
 * @see https://primevue.org/tailwind/
 * 
 * @example
 * ```ts
 * const fields = {
 *   themeColor: {
 *     type: FieldType.color,
 *     label: 'Theme Color',
 *     
 *     // PrimeVue options
 *     format: 'hex',  // 'hex', 'rgb', 'hsb'
 *     inline: false,
 *     
 *     // Styling
 *     class: 'border-2 border-primary',
 *   }
 * }
 * ```
 */
import { computed } from 'vue'
import ColorPicker from 'primevue/colorpicker'
import type { NormalizedColorField } from '@fancy-crud/vue'
import { useColorField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedColorField
}>()

const { hintText, modelValue, hasFieldErrors } = useColorField<any>(props)

const inputClass = computed(() => {
  const field = props.field as any
  const userClasses = field.class ? [field.class] : []
  const invalidClass = hasFieldErrors.value ? ['p-invalid'] : []
  
  return [...userClasses, ...invalidClass]
})
</script>
