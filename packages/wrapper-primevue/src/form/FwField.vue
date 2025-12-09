<template>
  <div class="field" :class="fieldClass">
    <label v-if="label" v-bind="attrs" class="block mb-2">{{ label }}</label>
    <slot />
    <small 
      v-if="hasFieldErrors" 
      class="field-hint p-error"
    >
      {{ message || '&nbsp;' }}
    </small>
    <small 
      v-else-if="message" 
      class="field-hint text-muted-color"
    >
      {{ message }}
    </small>
    <!-- Spacer when no message to maintain consistent spacing -->
    <small v-else class="field-hint">&nbsp;</small>
  </div>
</template>

<script lang="ts" setup>
/**
 * FwField - Field wrapper component for PrimeVue form fields
 * 
 * Provides consistent layout with:
 * - Label above the field
 * - Error/hint message below the field
 * - Consistent spacing between fields
 */
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  label?: string
  message?: string
  hasFieldErrors?: boolean
}>()

const attrs = useAttrs()

const fieldClass = computed(() => ({
  'p-invalid': props.hasFieldErrors,
}))
</script>

<style>
.field {
  margin-bottom: 0.5rem;
}

.field-hint {
  display: block;
  margin-top: 0.25rem;
  min-height: 1.25rem;
  line-height: 1.25rem;
}
</style>
