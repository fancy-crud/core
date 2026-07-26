<template>
  <!-- Compact mode (auto-detected in tables or forced with compact: true) -->
  <div v-if="useCompactMode" class="flex items-center justify-center">
    <Checkbox 
      v-if="!props.field.multiple && computedOptions.length === 1"
      v-model="modelValue" 
      :binary="true" 
      :trueValue="computedOptions[0][1]" 
      :falseValue="(props.field as any).falseValue ?? null"
      :disabled="(props.field as any).disabled"
      :readonly="(props.field as any).readonly"
      :invalid="hasFieldErrors"
      :size="(props.field as any).size"
      :variant="(props.field as any).variant"
      :class="(props.field as any).inputClass"
    />
    <Checkbox 
      v-else
      v-model="modelValue" 
      :disabled="(props.field as any).disabled"
      :readonly="(props.field as any).readonly"
      :invalid="hasFieldErrors"
      :size="(props.field as any).size"
      :class="(props.field as any).inputClass"
    />
  </div>

  <!-- Normal mode with full wrapper (for forms) -->
  <fw-field 
    v-else
    v-bind="(props.field as any).wrapper" 
    :label="fieldLabel" 
    :message="hintText" 
    :has-field-errors="hasFieldErrors"
  >
    <!-- Multiple checkboxes -->
    <div v-if="props.field.multiple" :class="containerClass" :style="(props.field as any).style">
      <div v-for="([label, value], _index) in computedOptions" :key="_index" class="flex items-center">
        <Checkbox 
          v-model="modelValue" 
          :inputId="`checkbox-${fieldId}-${_index}`" 
          :value="value"
          :disabled="(props.field as any).disabled"
          :readonly="(props.field as any).readonly"
          :invalid="hasFieldErrors"
          :size="(props.field as any).size"
          :variant="(props.field as any).variant"
          :class="(props.field as any).inputClass"
        />
        <label :for="`checkbox-${fieldId}-${_index}`" class="ml-2" :class="(props.field as any).labelClass">
          {{ getLabel(label) }}
        </label>
      </div>
    </div>
    
    <!-- Single/Binary checkbox -->
    <div v-else :class="containerClass" :style="(props.field as any).style">
      <div v-for="([label, value], _index) in computedOptions" :key="_index" class="flex items-center">
        <Checkbox 
          v-model="modelValue" 
          :inputId="`checkbox-${fieldId}-${_index}`" 
          :binary="true" 
          :trueValue="value" 
          :falseValue="(props.field as any).falseValue ?? null"
          :disabled="(props.field as any).disabled"
          :readonly="(props.field as any).readonly"
          :invalid="hasFieldErrors"
          :size="(props.field as any).size"
          :variant="(props.field as any).variant"
          :class="(props.field as any).inputClass"
        />
        <label v-if="getLabel(label)" :for="`checkbox-${fieldId}-${_index}`" class="ml-2" :class="(props.field as any).labelClass">
          {{ getLabel(label) }}
        </label>
      </div>
    </div>
  </fw-field>
</template>

<script lang="ts" setup>
/**
 * FwCheckbox - Checkbox wrapper for PrimeVue
 * 
 * **Label handling:**
 * - `label` - The field title (wrapper label). Set to empty string or use `hideLabel: true` to hide.
 * - `options` - The text next to each checkbox: `[['Checkbox text', value]]`
 * 
 * **Auto-detects context**: When inside a table cell, uses compact mode automatically.
 * 
 * @see https://primevue.org/checkbox/
 * 
 * @example
 * ```ts
 * const fields = {
 *   // Only checkbox text, no field label
 *   acceptTerms: {
 *     type: FieldType.checkbox,
 *     label: '',  // No field label
 *     // or: hideLabel: true,
 *     options: [['I accept the terms and conditions', true]],
 *   },
 *   
 *   // Both field label and checkbox text
 *   newsletter: {
 *     type: FieldType.checkbox,
 *     label: 'Newsletter',  // Field title
 *     options: [['Subscribe to our newsletter', true]],  // Checkbox text
 *   },
 *   
 *   // Field label only, no checkbox text
 *   isActive: {
 *     type: FieldType.checkbox,
 *     label: 'Status',
 *     options: [['', true]],  // No checkbox text, just the box
 *   },
 *   
 *   // Multiple options with field label
 *   hobbies: {
 *     type: FieldType.checkbox,
 *     label: 'Select your hobbies',
 *     multiple: true,
 *     options: [
 *       ['Reading', 'reading'],
 *       ['Gaming', 'gaming'],
 *       ['Sports', 'sports'],
 *     ],
 *   },
 * }
 * ```
 */
import { computed, ref, onMounted, getCurrentInstance } from 'vue'
import Checkbox from 'primevue/checkbox'
import type { NormalizedCheckboxField } from '@fancy-crud/vue'
import { useCheckboxField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedCheckboxField
}>()

const { modelValue, hintText, inRowDisplay, options, hasFieldErrors } = useCheckboxField<any>(props)

const fieldId = computed(() => String(props.formId).slice(7, 15))
const computedOptions = computed(() => options.value as any[][])

// Field label (wrapper title) - can be hidden with hideLabel or empty string
const fieldLabel = computed(() => {
  const field = props.field as any
  
  // Explicitly hide label
  if (field.hideLabel === true) return undefined
  
  // Empty string means no label
  if (field.label === '') return undefined
  
  // Return the label
  return field.label
})

// Auto-detect if we're inside a table cell
const isInsideTable = ref(false)

onMounted(() => {
  const instance = getCurrentInstance()
  if (instance) {
    let el = instance.vnode.el as HTMLElement | null
    while (el) {
      if (el.tagName === 'TD' || el.tagName === 'TH') {
        isInsideTable.value = true
        break
      }
      el = el.parentElement
    }
  }
})

// Determine if compact mode should be used
const useCompactMode = computed(() => {
  const field = props.field as any
  if (field.compact === true) return true
  if (field.compact === false) return false
  return isInsideTable.value
})

const containerClass = computed(() => {
  const field = props.field as any
  const baseClasses = field.inRow || inRowDisplay.value === 'checkbox-group--row' 
    ? ['flex', 'flex-wrap', 'gap-4'] 
    : ['flex', 'flex-col', 'gap-2']
  const userClasses = field.class ? [field.class] : []
  
  return [...baseClasses, ...userClasses]
})

function getLabel(label: unknown): string {
  return String(label || '')
}
</script>
