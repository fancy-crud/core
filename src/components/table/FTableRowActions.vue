<template>
  <div
    v-if="!props.hideEdit"
    class="tooltip"
    data-tip="{locale.t('Edit')}"
  >
    <f-button-icon
      @click="emit('edit')"
      icon="mdi-pencil"
      size="text-lg"
      class="text-gray-400"
    />
  </div>
  <div
    v-if="!props.hideDelete"
    class="tooltip"
    data-tip="{locale.t('Delete')}"
  >
    <f-button-icon
      @click="emit('delete')"
      icon="mdi-delete"
      size="text-lg"
      class="text-red-500"
    />
  </div>
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
