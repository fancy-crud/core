<template>
  <o-table
    v-bind="$attrs" :data="props.items" pagination-position="bottom"
    backend-pagination
    paginated
  >
    <template v-for="(column, _columnIndex) in headers" :key="_columnIndex">
      <o-table-column v-if="column.value === 'actions'" v-slot="{ row }">
        <f-table-row-actions
          @edit="emit('edit', row)"
          @delete="emit('delete', row)"
        />
      </o-table-column>
      <o-table-column
        v-else
        v-slot="{ row, index }"
        v-bind="column"
        :label="column.label"
        :field="column.value"
      >
        {{ getValue(row, column, index) }}
      </o-table-column>
    </template>
  </o-table>
</template>

<script lang="ts" setup>
import { OTable, OTableColumn } from '@oruga-ui/oruga-next'
import type { NormalizedColumn } from '@fancy-crud/core'
import { useColumnValue } from '@/tables/integration'

const props = defineProps<{
  items: any[]
  headers: NormalizedColumn[]
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
}>()

const { getValue } = useColumnValue()
</script>
