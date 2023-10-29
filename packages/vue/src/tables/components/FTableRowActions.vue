<template>
  <slot name="edit-button">
    <f-button
      v-if="!editButton.hide"
      @click="emit('edit')"
      v-bind="{ ...editButton }"
    />
  </slot>

  <slot name="delete-button">
    <f-button
      v-if="!deleteButton.hide"
      @click="emit('delete')"
      v-bind="{ ...deleteButton }"
    />
  </slot>
</template>

<script lang="ts" setup>
import { getDefaults } from '@fancy-crud/core'

const props = defineProps<{
  edit?: Record<string, any>
  delete?: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const defaults = computed(getDefaults)

const editButton = computed(() => ({
  hide: props.edit?.hide,
  ...defaults.value.editButton,
  ...(props.edit || {}),

}))

const deleteButton = computed(() => ({
  hide: props.delete?.hide,
  ...defaults.value.removeButton,
  ...(props.delete || {}),

}))
</script>
