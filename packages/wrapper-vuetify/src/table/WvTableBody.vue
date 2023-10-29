<template>
  <v-data-table-server
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
  </v-data-table-server>
</template>

<script lang="ts" setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import { FTableRowActions } from '@fancy-crud/vue'

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

const parseHeaders = computed(() => props.headers.map(header => ({ ...header, title: header.label, key: header.value })))
const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.key !== 'actions'))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}

function setPage(page: number) {
  emit('page-change', page)
}
</script>
