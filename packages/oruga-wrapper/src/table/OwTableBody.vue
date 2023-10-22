<template>
  <o-table
    v-bind="$attrs" :data="props.items" pagination-position="bottom"
    backend-pagination
    paginated
  >
    <slot>
      <template v-for="(column, _columnIndex) in headers" :key="_columnIndex">
        <o-table-column v-if="column.value === 'actions'" v-slot="{ row, index }">
          <slot name="column-actions" v-bind="{ row, index }">
            <f-table-row-actions
              @edit="emit('edit', row)"
              @delete="emit('delete', row)"
            />
          </slot>
        </o-table-column>

        <o-table-column
          v-else
          v-slot="{ row, index }"
          v-bind="column"
          :label="column.label"
          :field="column.value"
        >
          <slot :name="`column-${column.value}`" v-bind="{ row, index }">
            {{ getValue(row, column, index) }}
          </slot>
        </o-table-column>
      </template>
    </slot>
  </o-table>
</template>

<script lang="ts" setup>
import { OTable, OTableColumn } from '@oruga-ui/oruga-next'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'

const props = defineProps<{
  items: any[]
  headers: NormalizedColumn[]
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
}>()

const bus = new Bus()

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}
</script>
