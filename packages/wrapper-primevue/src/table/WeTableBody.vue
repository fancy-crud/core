<template>
  <DataTable
    v-bind="$attrs"
    :value="props.items"
    :loading="props.loading"
    class="elevation-1"
  >
    <template v-for="(column, _columnIndex) in parseHeaders" :key="_columnIndex">
      <template v-if="column.key === 'actions' && actionHeader">
        <Column :field="column.value" :header="column.label" v-bind="actionHeader">
          <template #body="slotProps">
            <slot name="column-actions" v-bind="{ row: slotProps.data, $index: slotProps.index }">
              <slot name="column-actions-prepend" v-bind="{ row: slotProps.data, $index: slotProps.index }" />
              <f-table-row-actions
                @edit="emit('edit', slotProps.data)"
                @delete="emit('delete', slotProps.data)"
                :edit="props.buttons.edit"
                :delete="props.buttons.remove"
              />
              <slot name="column-actions-append" v-bind="{ row: slotProps.data, $index: slotProps.index }" />
            </slot>
          </template>
        </Column>
      </template>
      <template v-else-if="column.key !== 'actions'">
        <Column :field="column.value" :header="column.label" v-bind="column as any">
          <template #body="slotProps">
            <slot :name="`column-${column.value}`" v-bind="{ row: slotProps.data, $index: slotProps.index }">
              {{ getValue(slotProps.data, column, slotProps.index) }}
            </slot>
          </template>
        </Column>
      </template>
    </template>
  </DataTable>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import type { TableBodyEmit, TableBodyProps } from '@fancy-crud/vue'
import { FTableRowActions } from '@fancy-crud/vue'

const props = defineProps<TableBodyProps>()

const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

const parseHeaders = computed(() => props.headers.map(header => ({ ...header, title: header.label, key: header.value })))
const actionHeader = computed(() => props.headers.find(header => header.value === 'actions' && header.exclude !== true) as any)

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}
</script>
