<template>
  <slot name="table-header" v-bind="tableHeaderVBind()">
    <f-table-header-actions
      @create="() => baseTable.openCreateModal()"
      @export="() => baseTable.exportData()"
      :add="props.buttons.add"
      :dump="props.buttons.dump"
    />
  </slot>

  <slot name="table-form" v-bind="{ onSuccess: () => baseTable.onSuccess() }">
    <f-modal v-model="table.settings.displayFormDialog">
      <div v-if="tableForm.settings.loading" class="loader-wrapper">
        <div :class="{ loader: tableForm.settings.loading }" />
      </div>
      <f-form
        v-else
        @success="() => baseTable.onSuccess()"
        v-bind="tableForm"
        :id="props.form.id"
      >
        <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
          <slot :name="slotName" v-bind="bind" />
        </template>
      </f-form>
    </f-modal>
  </slot>

  <slot name="table-body" v-bind="tableBodyVBind()">
    <f-table-body
      @edit="(row: Row) => baseTable.openEditModal(row)"
      @delete="(row: Row) => baseTable.onDelete(row)"
      v-bind="$attrs"
      :headers="headers"
      :items="computedData"
      :loading="table.list.isFetching"
      :buttons="props.buttons"
    >
      <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
        <slot :name="slotName" v-bind="bind" />
      </template>
    </f-table-body>
  </slot>

  <slot name="table-footer">
    <div class="flex justify-between mt-4">
      <f-table-footer
        @update:pagination="(newPagination: Pagination) => baseTable.setPagination(newPagination)"
        :pagination="pagination"
      />
    </div>
  </slot>

  <f-delete-confirmation-modal
    v-model="table.settings.displayConfirmationDialog"
    @accept="() => baseTable.onDelete(table.settings.rowToDelete, true)"
  >
    <template #default="{ accept, cancel }">
      <slot
        name="delete-confirmation-modal"
        v-bind="{ accept, cancel }"
      />
    </template>
  </f-delete-confirmation-modal>
</template>

<script lang="ts" setup>
import type { BaseTableForm, NormalizedTableButtons, NormalizedTableFilters, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, ObjectWithNormalizedColumns, Pagination, Row } from '@fancy-crud/core'
import { IFormStore, ITableStore, inject as injecting } from '@fancy-crud/core'
import type { VueTable } from '../Table'

const props = defineProps<{
  id: symbol
  columns: ObjectWithNormalizedColumns
  form: BaseTableForm
  settings: NormalizedTableSettings
  pagination: NormalizedTablePagination
  filterParams: NormalizedTableFilters
  buttons: NormalizedTableButtons
  list: NormalizedTableList
}>()

const emit = defineEmits<{
  (e: 'export'): void
}>()

const slots = useSlots()

const formStore: IFormStore = injecting(IFormStore.name)!
const tableStore: ITableStore = injecting(ITableStore.name)!
const baseTable: VueTable = injecting('IBaseTable')!

baseTable.setTableId(props.id)

const table = tableStore.searchById(props.id)!

const tableForm = formStore.searchById(table.formId)!
const headers = computed(() => Object.values(props.columns).filter(column => !column.exclude))

const computedData = computed<any[]>(() => {
  return table.list.data
})

baseTable.triggerFetchItems()

function tableHeaderVBind() {
  return {
    openCreateModal: () => baseTable.openCreateModal(),
    exportData: () => {
      emit('export')
      baseTable.exportData()
    },
  }
}

function tableBodyVBind() {
  return {
    openEditModal: (row: Row) => baseTable.openEditModal(row),
    onDelete: (row: Row) => baseTable.onDelete(row),
    setPagination: (p: Pagination) => baseTable.setPagination(p),
  }
}
</script>
