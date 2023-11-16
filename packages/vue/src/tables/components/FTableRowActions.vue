<template>
  <slot name="edit-button">
    <f-button
      v-if="!editButton.hidden"
      @click="emit('edit')"
      v-bind="{ ...editButton }"
    />
  </slot>

  <slot name="delete-button">
    <f-button
      v-if="!deleteButton.hidden"
      @click="emit('delete')"
      v-bind="{ ...deleteButton }"
    />
  </slot>
</template>

<script lang="ts" setup>
import type { NormalizedTableButton } from '@fancy-crud/core'
import { getDefaults } from '@fancy-crud/core'

const props = defineProps<{
  edit?: NormalizedTableButton
  delete?: NormalizedTableButton
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const defaults = computed(getDefaults)

const editButton = computed(() => ({
  hidden: props.edit?.hidden,
  ...defaults.value.editButton,
  ...(props.edit || {}),

}))

const deleteButton = computed(() => ({
  hidden: props.delete?.hidden,
  ...defaults.value.removeButton,
  ...(props.delete || {}),

}))
</script>
