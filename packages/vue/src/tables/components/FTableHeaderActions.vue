<template>
  <slot name="prepend" />
  <slot name="create-button">
    <f-button
      v-if="!isAddButtonHidden"
      @click="emit('create')"
      v-bind="{ ...defaults.addButton, ...props.add }"
    />
  </slot>
  <slot name="export-button">
    <f-button
      v-if="!isDumpButtonHidden"
      @click="emit('export')"
      v-bind="{ ...defaults.dumpButton, ...props.dump }"
    />
  </slot>
  <slot name="append" />
</template>

<script lang="ts" setup>
import type { NormalizedTableButton } from '@fancy-crud/core'
import { getDefaults } from '@fancy-crud/core'

const props = defineProps<{
  add?: NormalizedTableButton
  dump?: NormalizedTableButton
}>()

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'export'): void
}>()

const defaults = computed(getDefaults)
const isAddButtonHidden = computed(() => !!props.add?.hidden)
const isDumpButtonHidden = computed(() => !!props.dump?.hidden)
</script>
