<template>
  <label
    class="f-label block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    v-bind="$attrs"
  >
    <slot>
      {{ props.label }}
    </slot>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string
}>()
</script>
