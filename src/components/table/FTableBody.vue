<template>
  <tbody>
    <tr
      v-for="(row, rowIndex) in props.items"
      :key="`row-${rowIndex}`"
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap"
    >
      <td
        v-for="(header, j) in props.headers"
        :key="`row-item-${j}`"
        class="px-6 py-4 relative"
      >
        <template v-if="header.allowCheckbox">
          <div class="flex items-center justify-center">
            <input
              @click="hotUpdate(header.value, props.items[rowIndex])"
              type="checkbox"
              class="w-4 h-4 p-2 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              :checked="row[header.value]"
            >
          </div>
        </template>
        <template v-else-if="header.allowImagePreview">
          <f-table-row-file-preview
            type="image"
            :url="row[header.value]"
          />
        </template>
        <template v-else>
          {{ getValue(row, header, rowIndex) }}
        </template>
      </td>
      <td class="px-6 py-4 text-right flex">
        <f-table-row-actions
          @edit="emit('edit', row)"
          @delete="emit('delete', row)"
        />
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { TableHeader } from '@/types'

const props = defineProps<{
  headers: TableHeader[]
  items: any[]
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
  (e: 'hotUpdate', value: { field: string; row: any }): void
}>()

const hotUpdate = (field: string, row: any) => {
  emit('hotUpdate', { field, row })
}

const getValue = computed(() => (row: any, header: TableHeader, rowIndex: number) => {
  let value: any
  if (typeof row === 'object')
    value = row[header.value]

  if (header.field)
    value = header.field(row, rowIndex)

  if (header.format)
    value = header.format(value)

  return value
})
</script>
