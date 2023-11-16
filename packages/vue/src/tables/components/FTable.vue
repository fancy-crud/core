<template>
  <slot name="table-header" v-bind="{ openCreateModal, exportData }">
    <f-table-header-actions @create="openCreateModal" @export="exportData" :add="props.buttons.add" :dump="props.buttons.dump" />
  </slot>

  <slot name="table-form" v-bind="{ onSuccess, form: tableForm, formModal }">
    <f-modal v-model="formModal">
      <f-form
        @success="onSuccess"
        v-bind="tableForm"
        :id="props.form.id"
      >
        <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
          <slot :name="slotName" v-bind="bind" />
        </template>
      </f-form>
    </f-modal>
  </slot>

  <slot name="table-body" v-bind="{ openEditModal, onDelete, updateCheckbox, setPagination }">
    <f-table-body
      @edit="openEditModal"
      @delete="onDelete"
      @hot-update="updateCheckbox"
      @update:pagination="setPagination"
      v-bind="$attrs"
      :headers="headers"
      :items="computedData"
      :loading="isFetching"
      :pagination="pagination"
      :buttons="props.buttons"
    >
      <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
        <slot :name="slotName" v-bind="bind" />
      </template>
    </f-table-body>
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

<script lang="ts" generic="DataType = unknown" setup>
import type { BaseTableForm, DeleteRecordOptions, NormalizedTableButtons, NormalizedTablePagination, NormalizedTableSettings, ObjectWithNormalizedColumns, Pagination, Row } from '@fancy-crud/core'
import { Bus, DeleteRecordCommand, GetStoreTableCommand, IFormStore, PrepareFormToCreateCommand, PrepareFormToUpdateCommand } from '@fancy-crud/core'
import { useRequestList } from '@packages/vue/http'

const props = defineProps<{
  id: symbol
  columns: ObjectWithNormalizedColumns
  form: BaseTableForm
  settings: NormalizedTableSettings
  pagination: NormalizedTablePagination
  buttons: NormalizedTableButtons
  formModal?: boolean
  skipDeleteConfirmation?: boolean
  data?: DataType[]
}>()

const emit = defineEmits<{
  (e: 'update:formModal', value: boolean): void
  (e: 'export'): void
}>()

const slots = useSlots()

const bus = new Bus()
const formStore: IFormStore = inject(IFormStore.name)!

const { formId } = bus.execute(
  new GetStoreTableCommand(props.id),
)

const { list, isFetching, pagination, triggerRequest: fetchItems } = useRequestList<DataType>(
  props.settings.url,
  props.settings.filterParams,
  props.pagination,
  { autoTrigger: false },
)

const formModal = ref(Boolean(props.formModal))
const confirmationModal = ref(false)
const rowToDelete = ref<Row | null>(null)

const tableForm = formStore.searchById(formId)!
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
  // TODO: Create a plugin to export data
  emit('export')
}

function onSuccess() {
  fetchItems()
  closeModal()
}

function setPagination(newPagination: Pagination) {
  Object.assign(pagination, newPagination)
}

function closeModal() {
  formModal.value = false
}

function openModal() {
  formModal.value = true
}

function openCreateModal() {
  bus.execute(
    new PrepareFormToCreateCommand(formId, {
      onClickAux: closeModal,
    }),
  )
  openModal()
}

function openEditModal(row: Row) {
  bus.execute(
    new PrepareFormToUpdateCommand(formId, row, props.settings, {
      onClickAux: closeModal,
    }),
  )

  openModal()
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

  bus.execute(
    new DeleteRecordCommand(row, props.settings, options),
  )
}

function updateCheckbox() {
  throw new Error('This method is not implemented')
}
</script>
