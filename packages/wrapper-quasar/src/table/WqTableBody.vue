<template>
  <!-- <v-data-table-server
    @update:page="setPage"
    v-bind="$attrs"
    :headers="parseHeaders"
    :items="props.items"
    :items-length="props.total"
    :items-per-page="props.perPage"
    :loading="props.loading"
    class="elevation-1"
    item-value="name"
  >
    <template v-for="(column, _columnIndex) in excludeActionsHeaders" :key="_columnIndex" #[`item.${column.value}`]="bind">
      <slot :name="`column-${column.value}`" v-bind="{ ...bind, row: bind.item }">
        {{ getValue(bind.item, column, bind.index) }}
      </slot>
    </template>
    <template #[`item.actions`]="bind">
      <slot name="column-actions" v-bind="{ ...bind, row: bind.item }">
        <f-table-row-actions
          @edit="emit('edit', bind.item)"
          @delete="emit('delete', bind.item)"
        />
      </slot>
    </template>
  </v-data-table-server> -->
  <q-table
    @update:pagination="setPage"
    :rows="props.items"
    :columns="parseHeaders"
    row-key="id"
    :loading="props.loading"
  >
    <!-- <template v-for="(column, _columnIndex) in excludeActionsHeaders" :key="_columnIndex" #[`item.${column.value}`]="bind">
      <slot :name="`column-${column.value}`" v-bind="{ ...bind, row: bind.item }">
        {{ getValue(bind.item, column, bind.index) }}
      </slot>
    </template> -->
    <template #[`body-cell-actions`]="bind">
      <slot name="column-actions" v-bind="{ ...bind, row: bind.item }">
        <f-table-row-actions
          @edit="emit('edit', bind.item)"
          @delete="emit('delete', bind.item)"
        />
      </slot>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { QTable } from 'quasar'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import { FTableRowActions } from '@fancy-crud/vue'

interface QuasarColumn {
  fieldBackup: ((row: unknown, index: number) => unknown) | undefined
  field: string | ((row: unknown, index: number) => unknown)
  name: string
  label: string
  value: string
  format?: ((value: unknown) => unknown) | undefined
  allowCheckbox?: boolean | undefined
  allowImagePreview?: boolean | undefined
  exclude?: boolean | undefined
}

const props = defineProps<{
  items: any[]
  headers: NormalizedColumn[]
  perPage: number
  total: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
  (e: 'page-change', page: number): void
}>()

const bus = new Bus()

const parseHeaders = computed(() => props.headers.map((header) => {
  const fieldBackup = header.field
  const field: string | NonNullable<typeof header.field> = header.field ?? header.value
  return {
    align: 'left',
    ...header,
    fieldBackup,
    field,
    name: header.value,
  }
}))
const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.name !== 'actions'))

function getValue(row: any, column: QuasarColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, {
      ...column,
      field: column.fieldBackup,
    }, rowIndex),
  )
}

function setPage({ page }: { page: number }) {
  emit('page-change', page)
}
</script>
