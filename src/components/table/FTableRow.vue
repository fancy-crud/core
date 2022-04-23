<template>
  <tr
    v-for="(row, rowIndex) in rows"
    :key="`row-${rowIndex}`"
  >
    <td
      v-for="(header, j) in headers"
      :key="`row-item-${j}`"
    >
      {{ getValue(row, header) }}
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

const getValue = (row: unknown, header: TableHeader) => {
  let value: any
  if (typeof row === 'object')
    value = (row as { [k: string]: unknown })[header.value]

  if (header.field)
    value = header.field(row, i)

  if (header.format)
    value = header.format(value)

  return value
}
</script>
