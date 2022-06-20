<template>
  <f-button-icon
    v-if="!props.hideEdit"
    @click="emit('edit')"
    :tooltip="t('edit')"
    icon="mdi-pencil"
    size="text-lg"
    text-color="text-gray-400"
  />

  <f-button-icon
    v-if="!props.hideDelete"
    @click="emit('delete')"
    :tooltip="t('delete')"
    icon="mdi-delete"
    size="text-lg"
    text-color="text-red-500"
  />
</template>

<script lang="ts" setup>
import { useLocale } from '@/composables'
const props = defineProps<{
  hideEdit?: boolean
  hideDelete?: boolean
}>()
const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const t = useLocale()
</script>
