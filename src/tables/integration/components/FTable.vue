<template>
  <slot name="table-header" v-bind="{ openCreateModal, exportData }">
    <f-table-header-actions @create="openCreateModal" @export="exportData" />
  </slot>

  <slot name="table-form" v-bind="{ onSuccess, form, formModal }">
    <f-modal v-model="formModal">
      <div
        class="p-5 bg-white"
        max-width="max-w-3xl"
      >
        <f-form
          @success="onSuccess"
          v-bind="form"
          :id="props.form.id"
        />
      </div>
    </f-modal>
  </slot>

  <slot name="table-body" v-bind="{ openEditModal, onDelete, updateCheckbox: tableManager.updateCheckbox, setPage }">
    <f-table-body
      @edit="openEditModal"
      @delete="onDelete"
      @hot-update="tableManager.updateCheckbox"
      @page-change="setPage"
      v-bind="$attrs"
      :headers="headers"
      :items="computedData"
      :loading="isFetching"
      :per-page="pagination.rowsPerPage"
      :total="pagination.count"
    />
  </slot>

  <slot name="table-footer" />

  <f-delete-confirmation-modal
    v-model="confirmationModal"
    @accept="onDelete(rowToDelete, true)"
  >
    <template #default="{ accept, cancel }">
      <slot
        name="delete-confirmation-modal"
        v-bind="{ accept, cancel }"
      />
    </template>
  </f-delete-confirmation-modal>
</template>

<script lang="ts" setup generic="DataType = unknown">
import type { BaseTableForm, DeleteRecordOptions, NormalizedTablePagination, NormalizedTableSetting, ObjectWithNormalizedColumns, Row } from '@fancy-crud/core'
import { TableManagerHandler } from '@fancy-crud/core'

const props = defineProps<{
  id: symbol
  columns: ObjectWithNormalizedColumns
  form: BaseTableForm
  settings: NormalizedTableSetting
  pagination: NormalizedTablePagination
  formModal?: boolean
  skipDeleteConfirmation?: boolean
  data?: DataType[]
}>()

const emit = defineEmits<{
  (e: 'update:formModal', value: boolean): void
  (e: 'export'): void
}>()

const tableManager = new TableManagerHandler(props.id)

const { list, isFetching, pagination, triggerRequest: fetchItems } = useRequestList<DataType>(
  props.settings.url,
  props.settings.filterParams,
  props.pagination,
  { autoTrigger: false },
)

const formModal = ref(Boolean(props.formModal))
const confirmationModal = ref(false)
const rowToDelete = ref<Row | null>(null)

const form = tableManager.getTable().formManager.getForm()
const headers = computed(() => Object.values(props.columns).filter(column => !column.exclude))

const computedData = computed<DataType[]>(() => {
  if (Array.isArray(props.data))
    return props.data
  return list.value
})

triggerFetchItems()

watch(() => props.formModal, () => {
  formModal.value = Boolean(props.formModal)
})

watch(formModal, () => {
  emit('update:formModal', formModal.value)
})

function triggerFetchItems() {
  if (!Array.isArray(props.data))
    fetchItems()
}

function exportData() {
  // const xlsx = useXLSX(props.table)
  // xlsx.triggerRequest()

  emit('export')
}

function onSuccess() {
  fetchItems()
  closeModal()
}

function setPage(page: number) {
  pagination.page = page
}

function closeModal() {
  formModal.value = false
}

function openModal() {
  formModal.value = true
}

function openCreateModal() {
  tableManager.setupFormToCreateRecord({
    onReady: openModal,
    onClickAux: closeModal,
  })
}

function openEditModal(row: Row) {
  tableManager.setupFormToEditRecord(row, {
    onReady: openModal,
    onClickAux: closeModal,
  })
}

function onDelete(row: Row | null, skipDeleteConfirmation?: boolean) {
  if (!row)
    return

  const options: DeleteRecordOptions = {
    onRequestDeleteConfirmation(row: Row) {
      rowToDelete.value = row
      confirmationModal.value = true
    },
    onFinally() {
      fetchItems()
    },
  }

  if (skipDeleteConfirmation)
    options.onRequestDeleteConfirmation = undefined

  tableManager.deleteRecord(row, options)
}
</script>
