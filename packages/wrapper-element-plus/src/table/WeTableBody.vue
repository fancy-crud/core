<template>
  <el-table
    v-bind="$attrs"
    :data="props.items"
    :loading="props.loading"
    class="elevation-1"
    item-value="name"
  >
    <el-table-column v-for="(column, _columnIndex) in excludeActionsHeaders" :key="_columnIndex" v-slot="bind" :prop="column.value" :label="column.label">
      <slot :name="`column-${column.value}`" v-bind="bind">
        {{ getValue(bind.row, column, bind.$index) }}
      </slot>
    </el-table-column>

    <el-table-column v-slot="bind" prop="actions" label="Actions">
      <slot name="column-actions" v-bind="bind">
        <f-table-row-actions
          @edit="emit('edit', bind.row)"
          @delete="emit('delete', bind.row)"
          :edit="props.buttons.edit"
          :delete="props.buttons.remove"
        />
      </slot>
    </el-table-column>
  </el-table>
  <div class="flex justify-between">
    <el-dropdown>
      <el-button tag="a">
        {{ state.pagination.perPage }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="rowsPerPage in props.pagination.rowsPerPageOptions"
            @click="state.pagination.perPage = rowsPerPage"
            :key="rowsPerPage"
          >
            {{ rowsPerPage }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-pagination
      v-model:current-page="state.pagination.page"
      background
      layout="prev, pager, next"
      :page-size="state.pagination.perPage"
      :total="props.pagination.count"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
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
    page: props.pagination.page,
  },
})

const bus = new Bus()

const parseHeaders = computed(() => props.headers.map(header => ({ ...header, title: header.label, key: header.value })))
const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.key !== 'actions'))

watch(() => state.pagination.perPage, rowsPerPage => updatePagination({ rowsPerPage }))
watch(() => state.pagination.page, page => updatePagination({ page }))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}

// function setPage(page: number) {
//   updatePagination({
//     page,
//   })
// }
function updatePagination(pagination: Pagination) {
  emit('update:pagination', pagination)
}
</script>
