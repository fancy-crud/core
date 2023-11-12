<template>
  <o-table
    @page-change="setPage" v-bind="$attrs" :data="props.items"
    pagination-position="bottom"
    :per-page="props.pagination.rowsPerPage"
    :total="props.pagination.count"
    backend-pagination
    paginated
  >
    <slot>
      <template v-for="(column, _columnIndex) in headers" :key="_columnIndex">
        <o-table-column
          v-if="column.value !== 'actions'"
          v-slot="{ row, index }"
          v-bind="column"
          :label="column.label"
          :field="column.value"
        >
          <slot :name="`column-${column.value}`" v-bind="{ row, index }">
            {{ getValue(row, column, index) }}
          </slot>
        </o-table-column>
        <o-table-column v-else v-slot="{ row, index }">
          <slot name="column-actions" v-bind="{ row, index }">
            <f-table-row-actions
              @edit="emit('edit', row)"
              @delete="emit('delete', row)"
            />
          </slot>
        </o-table-column>
      </template>
    </slot>

    <template #bottom-left>
      <o-select v-model="state.pagination.perPage">
        <option v-for="page in props.pagination.rowsPerPageOptions" :key="page" :value="page">
          {{ page }}
        </option>
      </o-select>
    </template>
  </o-table>
</template>

<script lang="ts" setup>
import { OSelect, OTable, OTableColumn } from '@oruga-ui/oruga-next'
import type { NormalizedColumn, NormalizedTablePagination, Pagination } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'

const props = defineProps<{
  items: any[]
  headers: NormalizedColumn[]
  pagination: NormalizedTablePagination
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
  (e: 'update:pagination', pagination: Pagination): void
}>()

const bus = new Bus()

const state = reactive({
  pagination: {
    perPage: props.pagination.rowsPerPage,
  },
})

watch(() => state.pagination.perPage, rowsPerPage => updatePagination({ rowsPerPage }))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}

function setPage(page: number) {
  updatePagination({ page })
}

function updatePagination(pagination: Pagination) {
  emit('update:pagination', pagination)
}
</script>
