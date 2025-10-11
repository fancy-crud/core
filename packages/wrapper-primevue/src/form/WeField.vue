<template>
  <div class="field" :class="{ 'p-invalid': hasFieldErrors }">
    <label v-if="label" v-bind="attrs" class="block mb-2">{{ label }}</label>
    <slot />
    <small 
      v-if="hasFieldErrors" 
      class="field-hint p-error"
    >
      {{ message }}
    </small>
    <small 
      v-else 
      class="field-hint text-gray-600"
    >
      {{ message }}
    </small>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  message?: string
  hasFieldErrors?: boolean
}>()

const attrs = useAttrs()
</script>

<style lang="sass">
.field-hint
  display: block
  margin-top: 0.25rem
  min-height: 1.25rem
  line-height: 1.25rem
  margin-bottom: 0.5rem
</style>
