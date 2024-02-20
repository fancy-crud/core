<template>
  <q-table
    v-bind="$attrs"
    :rows="props.items"
    :columns="parseHeaders"
    row-key="id"
    :loading="props.loading"
    :rows-per-page-options="[0]"
    hide-bottom
  >
    <template v-for="(column, _columnIndex) in excludeActionsHeaders" :key="_columnIndex" #[`body-cell-${column.value}`]="bind">
      <q-td :key="column.value" :props="bind">
        <slot :name="`column-${column.value}`" v-bind="bind">
          {{ getValue(bind.row, column, bind.index) }}
        </slot>
      </q-td>
    </template>
    <template v-if="actionHeader" #[`body-cell-actions`]="bind">
      <q-td key="actions" :props="bind" v-bind="actionHeader">
        <slot name="column-actions" v-bind="bind">
          <slot name="column-actions-prepend" v-bind="bind" />
          <f-table-row-actions
            @edit="emit('edit', bind.row)"
            @delete="emit('delete', bind.row)"
            :edit="props.buttons.edit"
            :delete="props.buttons.remove"
          />
          <slot name="column-actions-append" v-bind="bind" />
        </slot>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { QTable, QTd } from 'quasar'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import type { TableBodyEmit, TableBodyProps } from '@fancy-crud/vue'
import { FTableRowActions } from '@fancy-crud/vue'

interface QuasarColumn {
  fieldBackup: ((row: unknown, index: number) => unknown) | undefined
  field: string | ((row: any) => any)
  name: string
  label: string
  value: string
  format?: ((value: unknown) => unknown)
  allowCheckbox?: boolean | undefined
  allowImagePreview?: boolean | undefined
  exclude?: boolean | undefined
}

const props = defineProps<TableBodyProps>()

const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

const parseHeaders = computed((): QuasarColumn[] => props.headers.map((header) => {
  const fieldBackup = header.field
  const field: any = header.field ?? header.value
  return {
    align: 'left',
    ...header,
    fieldBackup,
    field,
    name: header.value,
  }
}))

const actionHeader = computed(() => props.headers.find(header => header.value === 'actions' && header.exclude !== true))

const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.name !== 'actions'))

function getValue(row: any, column: QuasarColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, {
      ...column,
      field: column.fieldBackup,
    }, rowIndex),
  )
}
</script>
