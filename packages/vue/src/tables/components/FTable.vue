<template>
  <slot name="table-header" v-bind="tableHeaderVBind">
    <f-table-header-actions v-bind="tableHeaderVBind" />
  </slot>

  <f-modal v-model="table.settings.displayFormDialog" v-bind="table.settings.modal">
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

  <slot name="table-footer" v-bind="tableFooterVBind">
    <div v-if="!props.pagination.hidden" class="flex justify-between mt-4">
      <f-table-footer v-bind="tableFooterVBind" />
    </div>
  </slot>

  <f-delete-confirmation-modal
    v-model="table.settings.displayConfirmationDialog"
    @accept="() => props.buttons.remove.onClick()"
    @cancel="() => table.settings.rowToDelete = null"
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
import type { BaseTableForm, NormalizedTableButtons, NormalizedTableFilters, NormalizedTableList, NormalizedTablePagination, NormalizedTableSettings, ObjectWithNormalizedColumns, Pagination } from '@fancy-crud/core'
import { Bus, IFormStore, ITableStore, ResetTablePaginationCommand, inject as injecting } from '@fancy-crud/core'

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

provide('tableId', props.id)

const slots = useSlots()

const formStore: IFormStore = injecting(IFormStore.name)!
const tableStore: ITableStore = injecting(ITableStore.name)!

const table = tableStore.searchById(props.id)!

const tableForm = formStore.searchById(table.formId)!
const headers = computed(() => Object.values(props.columns).filter(column => !column.exclude))

const computedData = computed<any[]>(() => {
  return table.list.data
})

props.list.fetchData()

const tableHeaderVBind = computed(() => {
  const dump = props.buttons.dump

  return {
    onCreate: props.buttons.add.onClick,
    onExport: () => dump.onClick ? dump.onClick() : null,
    add: props.buttons.add,
    dump: props.buttons.dump,
  }
})

const tableFormVBind = computed(() => {
  return {
    ...tableForm,
    id: props.form.id,
    onSuccess: () => {
      props.list.fetchData()
      table.settings.displayFormDialog = false
    },
  }
})

const tableBodyVBind = computed(() => {
  return {
    onEdit: props.buttons.edit.onClick,
    onDelete: props.buttons.remove.onClick,
    items: computedData.value,
    loading: table.list.isFetching,
    buttons: props.buttons,
    headers: headers.value,
  }
})

const tableFooterVBind = computed(() => {
  return {
    'pagination': props.pagination,
    'onUpdate:pagination': (newPagination: Pagination) => Object.assign(table.pagination, newPagination),
  }
})

const bus = new Bus()
watch(() => table.filterParams, () => {
  if (table.pagination.page === 1)
    props.list.fetchData()

  bus.execute(
    new ResetTablePaginationCommand(props.id),
  )
}, { deep: true })

watch(() => table.pagination.page, () => {
  if (table.list.options?.hotFetch !== false)
    props.list.fetchData()
})

watch(() => table.pagination.rowsPerPage, () => {
  if (table.list.options?.hotFetch !== false)
    props.list.fetchData()
})
</script>
