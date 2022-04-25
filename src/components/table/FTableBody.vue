<template>
  <tbody>
    <f-table-row
      :headers="headers"
      :rows="items"
    >
      <template #default="{ rowIndex }">
        <td class="px-6 py-4 text-right flex">
          <div
            class="tooltip"
            data-tip="{locale.t('Edit')}"
          >
            <f-button-icon
              @click="onEdit(rowIndex)"
              icon="mdi-pencil"
              size="text-lg"
            />
          </div>
          <div
            class="tooltip"
            data-tip="{locale.t('Delete')}"
          >
            <f-button-icon
              @click="onDelete(rowIndex)"
              icon="mdi-delete"
              size="text-lg"
            />
          </div>
        </td>
      </template>
    </f-table-row>
  </tbody>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@/types'

const props = defineProps<{
  headers: TableHeader[]
  items: unknown[]
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
}>()

const onEdit = (rowIndex: number) => {
  emit('edit', props.items[rowIndex])
}

const onDelete = (rowIndex: number) => {
  emit('delete', props.items[rowIndex])
}

</script>
