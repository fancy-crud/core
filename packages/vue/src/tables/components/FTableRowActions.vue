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

const editButton = computed(() => {
  const { onClick, ...edit } = (props.edit || {}) as any
  return {
    hidden: edit?.hidden,
    ...defaults.value.editButton,
    ...(edit || {}),

  }
})

const deleteButton = computed(() => {
  const { onClick, ...remove } = (props.delete || {}) as any
  return {
    hidden: remove?.hidden,
    ...defaults.value.removeButton,
    ...(remove || {}),

  }
})
</script>
