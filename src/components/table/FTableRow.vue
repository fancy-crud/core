<template>
  <tr
    v-for="(row, rowIndex) in props.rows"
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
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            :checked="row[header.value]"
          >
        </div>
      </template>
      <template v-else-if="header.allowImagePreview">
        <f-table-row-file-preview
          type="image"
          url="https://nyota.nl/wp-content/uploads/sites/84/2013/10/500x500.gif"
        />
      </template>
      <template v-else>
        {{ getValue(row, header, rowIndex) }}
      </template>
    </td>
    <slot v-bind="{ rowIndex}" />
  </tr>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@/types'

const props = defineProps<{
  rows: any[]
  headers: TableHeader[]
}>()

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
