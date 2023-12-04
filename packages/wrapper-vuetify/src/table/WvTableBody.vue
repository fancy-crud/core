<template>
  <v-data-table
    v-bind="$attrs"
    :headers="parseHeaders"
    :items="props.items"
    :loading="props.loading"
    class="elevation-1"
    item-value="name"
    loading-text=""
  >
    <template v-for="(column, _columnIndex) in excludeActionsHeaders" :key="_columnIndex" #[`item.${column.value}`]="bind">
      <slot :name="`column-${column.value}`" v-bind="{ ...bind, row: bind.item }">
        {{ getValue(bind.item, column, bind.index) }}
      </slot>
    </template>
    <template v-if="hasActionHeader" #[`item.actions`]="bind">
      <slot name="column-actions" v-bind="{ ...bind, row: bind.item }">
        <f-table-row-actions
          @edit="emit('edit', bind.item)"
          @delete="emit('delete', bind.item)"
          :edit="props.buttons.edit"
          :delete="props.buttons.remove"
        />
      </slot>
    </template>
    <template #bottom>
      <span />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import type { TableBodyEmit, TableBodyProps } from '@fancy-crud/vue'
import { FTableRowActions } from '@fancy-crud/vue'

const props = defineProps<TableBodyProps>()

const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

const parseHeaders = computed(() => props.headers.map(header => ({ ...header, title: header.label, key: header.value })))
const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.key !== 'actions'))
const hasActionHeader = computed(() => props.headers.some(header => header.value === 'actions' && header.exclude !== true))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}
</script>
