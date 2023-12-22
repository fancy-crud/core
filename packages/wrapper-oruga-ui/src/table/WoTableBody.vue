<template>
  <o-table
    v-bind="$attrs" :data="props.items"
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

        <template v-else>
          <o-table-column v-if="actionHeader" v-slot="{ row, index }" v-bind="actionHeader">
            <slot name="column-actions" v-bind="{ row, index }">
              <f-table-row-actions
                @edit="emit('edit', row)"
                @delete="emit('delete', row)"
                :edit="props.buttons.edit"
                :delete="props.buttons.remove"
              />
            </slot>
          </o-table-column>
        </template>
      </template>
    </slot>
  </o-table>
</template>

<script lang="ts" setup>
import { OTable, OTableColumn } from '@oruga-ui/oruga-next'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import type { TableBodyEmit, TableBodyProps } from '@fancy-crud/vue'
import { FTableRowActions } from '@fancy-crud/vue'

const props = defineProps<TableBodyProps>()

const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

const actionHeader = computed(() => props.headers.find(header => header.value === 'actions' && header.exclude !== true))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}
</script>
