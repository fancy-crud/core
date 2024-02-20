<template>
  <el-table
    v-loading="props.loading"
    v-bind="$attrs"
    :data="props.items"
    class="elevation-1"
    item-value="name"
  >
    <el-table-column v-for="(column, _columnIndex) in excludeActionsHeaders" v-bind="column" :key="_columnIndex" v-slot="bind" :prop="column.value">
      <slot :name="`column-${column.value}`" v-bind="bind">
        {{ getValue(bind.row, column, bind.$index) }}
      </slot>
    </el-table-column>

    <template v-if="actionHeader">
      <el-table-column v-slot="bind" prop="actions" v-bind="actionHeader">
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
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import type { NormalizedColumn } from '@fancy-crud/core'
import { Bus, GetColumnValueCommand } from '@fancy-crud/core'
import type { TableBodyEmit, TableBodyProps } from '@fancy-crud/vue'
import { FTableRowActions } from '@fancy-crud/vue'

const props = defineProps<TableBodyProps>()

const emit = defineEmits<TableBodyEmit>()

const bus = new Bus()

const parseHeaders = computed(() => props.headers.map(header => ({ ...header, title: header.label, key: header.value })))
const excludeActionsHeaders = computed(() => parseHeaders.value.filter(header => header.key !== 'actions'))
const actionHeader = computed(() => props.headers.find(header => header.value === 'actions' && header.exclude !== true))

function getValue(row: any, column: NormalizedColumn, rowIndex: number) {
  return bus.execute(
    new GetColumnValueCommand(row, column, rowIndex),
  )
}
</script>
