<template>
  <f-button
    v-if="!props.hideEdit"
    @click="emit('edit')"
    icon="pencil"
    class="text-primary"
    borderless
  />

  <f-button
    v-if="!props.hideDelete"
    @click="emit('delete')"
    icon="delete"
    class="text-danger"
    borderless
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  hideEdit?: boolean
  hideDelete?: boolean
}>()
const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>
