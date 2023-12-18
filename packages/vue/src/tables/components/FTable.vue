<template>
  <slot name="table-header" v-bind="tableHeaderVBind">
    <f-table-header-actions v-bind="tableHeaderVBind" />
  </slot>

  <f-modal v-model="table.settings.displayFormDialog">
    <slot name="table-form" v-bind="tableFormVBind">
      <div v-if="tableForm.settings.loading" class="loader-wrapper">
        <div :class="{ loader: tableForm.settings.loading }" />
      </div>
      <f-form
        v-else
        v-bind="tableFormVBind"
        :id="props.form.id"
      >
        <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
          <slot :name="slotName" v-bind="bind" />
        </template>
      </f-form>
    </slot>
  </f-modal>

  <slot name="table-body" v-bind="tableBodyVBind">
    <f-table-body v-bind="{ ...$attrs, ...tableBodyVBind }">
      <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
        <slot :name="slotName" v-bind="bind" />
      </template>
    </f-table-body>
  </slot>

  <slot name="table-footer">
    <div class="flex justify-between mt-4">
      <f-table-footer v-bind="tableFooterVBind" />
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
baseTable.createWatchers()

const table = tableStore.searchById(props.id)!

const tableForm = formStore.searchById(table.formId)!
const headers = computed(() => Object.values(props.columns).filter(column => !column.exclude))

const computedData = computed<any[]>(() => {
  return table.list.data
})

baseTable.triggerFetchItems()

const tableHeaderVBind = computed(() => {
  return {
    onCreate: () => baseTable.openCreateModal(),
    onExport: () => {
      emit('export')
      baseTable.exportData()
    },
    add: props.buttons.add,
    dump: props.buttons.dump,
  }
})

const tableFormVBind = computed(() => {
  return {
    ...tableForm,
    id: props.form.id,
    onSuccess: () => baseTable.onSuccess(),
  }
})

const tableBodyVBind = computed(() => {
  return {
    openEditModal: (row: Row) => baseTable.openEditModal(row),
    onEdit: (row: Row) => baseTable.openEditModal(row),
    onDelete: (row: Row) => baseTable.onDelete(row),
    items: computedData.value,
    loading: table.list.isFetching,
    buttons: props.buttons,
    headers: headers.value,
  }
})

const tableFooterVBind = computed(() => {
  return {
    'pagination': props.pagination,
    'onUpdate:pagination': (newPagination: Pagination) => baseTable.setPagination(newPagination),
  }
})
</script>
