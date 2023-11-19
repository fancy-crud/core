<template>
  <q-table
    v-bind="$attrs"
    v-model:pagination="computedPagination"
    @request="setPage"
    :rows="props.items"
    :columns="parseHeaders"
    row-key="id"
    :loading="props.loading"
    :rows-per-page-options="props.pagination.rowsPerPageOptions"
  >
    <template v-for="(column, _columnIndex) in excludeActionsHeaders" :key="_columnIndex" #[`body-cell-${column.value}`]="bind">
      <q-td :key="column.value" :props="bind">
        <slot :name="`column-${column.value}`" v-bind="bind">
          {{ getValue(bind.row, column, bind.index) }}
        </slot>
      </q-td>
    </template>
    <template v-if="hasActionHeader" #[`body-cell-actions`]="bind">
      <q-td key="actions" :props="bind">
        <slot name="column-actions" v-bind="bind">
          <f-table-row-actions
            @edit="emit('edit', bind.row)"
            @delete="emit('delete', bind.row)"
            :edit="props.buttons.edit"
            :delete="props.buttons.remove"
          />
        </slot>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { QTable, QTd } from 'quasar'
import type { NormalizedColumn, NormalizedTableButtons, NormalizedTablePagination, Pagination } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
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

const props = defineProps<{
  items: any[]
  headers: NormalizedColumn[]
  loading: boolean
  pagination: NormalizedTablePagination
  buttons: NormalizedTableButtons
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
  (e: 'update:pagination', pagination: Pagination): void
}>()

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

const hasActionHeader = computed(() => props.headers.some(header => header.value === 'actions' && header.exclude !== true))

const computedPagination = computed({
  get() {
    return {
      rowsPerPage: props.pagination.rowsPerPage,
      rowsNumber: props.pagination.count,
      page: props.pagination.page,
    }
  },
  set(_value) {},
})

const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.name !== 'actions'))

function getValue(row: any, column: QuasarColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, {
      ...column,
      field: column.fieldBackup,
    }, rowIndex),
  )
}

function setPage({ pagination }: any) {
  emit('update:pagination', {
    page: pagination.page,
    rowsPerPage: pagination.rowsPerPage,
    count: pagination.rowsNumber,
  })
}
</script>
