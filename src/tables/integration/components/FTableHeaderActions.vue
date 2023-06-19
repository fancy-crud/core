<template>
  <slot name="prepend" />
  <slot name="create-button">
    <f-button
      @click="emit('create')"
      icon="plus"
      class="text-primary"
      borderless
    />
  </slot>
  <slot name="export-button">
    <f-button
      @click="emit('export')"
      icon="microsoft-excel"
      class="text-primary-500"
      borderless
    />
  </slot>
  <slot name="append" />
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'create'): void
  (e: 'export'): void
}>()
</script>
