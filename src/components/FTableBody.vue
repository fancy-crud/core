<template>
  <tbody>
    <f-table-row
      :headers="headers"
      :rows="items"
    >
      <template #default="{ rowIndex }">
        <td class="text-right">
          <div
            class="tooltip"
            data-tip="{locale.t('Edit')}"
          >
            <button
              @click="onEdit(rowIndex)"
              class="btn btn-circle btn-ghost"
            >
              <i class="mdi mdi-pencil text-slate-400 text-lg" />
            </button>
          </div>
          <div
            class="tooltip"
            data-tip="{locale.t('Delete')}"
          >
            <button
              @click="onDelete(rowIndex)"
              class="btn btn-circle btn-ghost"
            >
              <i class="mdi mdi-delete text-red-600 text-lg" />
            </button>
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
  (e: 'edit', row: any)
  (e: 'delete', row: any)
}>()

const onEdit = (rowIndex: number) => {
  emit('edit', props.items[rowIndex])
}

const onDelete = (rowIndex: number) => {
  emit('delete', props.items[rowIndex])
}

</script>
