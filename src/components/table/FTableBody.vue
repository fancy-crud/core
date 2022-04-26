<template>
  <tbody>
    <f-table-row
      :headers="headers"
      :rows="items"
    >
      <template #default="{ rowIndex }">
        <td class="px-6 py-4 text-right flex">
          <f-table-row-actions
            @edit="onEdit(rowIndex)"
            @delete="onDelete(rowIndex)"
          />
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
