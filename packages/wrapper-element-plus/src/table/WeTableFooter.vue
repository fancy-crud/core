<template>
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
    :page-size="state.pagination.perPage"
    :total="props.pagination.count"
    layout="prev, pager, next"
    :pager-count="11"
    background
  />
</template>

<script lang="ts" setup>
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElPagination } from 'element-plus'
import type { TableFooterEmit, TableFooterProps } from '@fancy-crud/vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()
const state = useTableFooter(props.pagination, emit)

const tableId = inject('tableId')
console.log('🚀 ~ tableId:', tableId)
</script>
