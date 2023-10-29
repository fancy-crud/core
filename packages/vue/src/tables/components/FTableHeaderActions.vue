<template>
  <slot name="prepend" />
  <slot name="create-button">
    <f-button
      @click="emit('create')"
      v-bind="defaults.addButton"
    />
  </slot>
  <slot name="export-button">
    <f-button
      @click="emit('export')"
      v-bind="defaults.exportButton"
    />
  </slot>
  <slot name="append" />
</template>

<script lang="ts" setup>
import { getDefaults } from '@fancy-crud/core'

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'export'): void
}>()

const defaults = computed(getDefaults)
</script>
