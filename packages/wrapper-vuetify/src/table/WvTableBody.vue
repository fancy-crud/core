<template>
  <v-data-table-server
    v-model:items-per-page="state.pagination.perPage"
    @update:page="setPage"
    v-bind="$attrs"
    :headers="parseHeaders"
    :items="props.items"
    :items-length="props.pagination.count"
    :items-per-page-options="props.pagination.rowsPerPageOptions"
    :loading="props.loading"
    class="elevation-1"
    item-value="name"
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
  </v-data-table-server>
</template>

<script lang="ts" setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { NormalizedColumn, NormalizedTableButtons, NormalizedTablePagination, Pagination } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import { FTableRowActions } from '@fancy-crud/vue'

const props = defineProps<{
  items: any[]
  headers: NormalizedColumn[]
  pagination: NormalizedTablePagination
  loading: boolean
  buttons: NormalizedTableButtons
}>()

const emit = defineEmits<{
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
  (e: 'update:pagination', pagination: Pagination): void
}>()

const state = reactive({
  pagination: {
    perPage: props.pagination.rowsPerPage,
  },
})

const bus = new Bus()

const parseHeaders = computed(() => props.headers.map(header => ({ ...header, title: header.label, key: header.value })))
const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.key !== 'actions'))
const hasActionHeader = computed(() => props.headers.some(header => header.value === 'actions' && header.exclude !== true))

watch(() => state.pagination.perPage, rowsPerPage => updatePagination({ rowsPerPage }))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}

function setPage(page: number) {
  updatePagination({
    page,
  })
}
function updatePagination(pagination: Pagination) {
  emit('update:pagination', pagination)
}
</script>
