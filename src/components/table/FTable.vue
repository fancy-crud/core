<template>
  <div class="card bg-base-100 shadow-xl rounded-md">
    <div class="flex flex-nowrap p-4 items-center justify-between">
      <div>
        <input
          type="text"
          placeholder="locale.t('search')"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
      </div>
      <div class="flex items-center relative">
        <f-modal
          v-model="formModal"
        >
          <template #activator>
            <f-button-icon
              @click="openCreateModal"
              tooltip="Crear nuevo"
              icon="mdi-plus"
            />
          </template>
          <f-form :form="form" />
        </f-modal>
        <f-button-icon
          icon="mdi-microsoft-excel"
          tooltip="Exportar"
        />
      </div>
    </div>
    <div class="overflow-x-auto p-4">
      <table class="table table-compact w-full divide-y divide-slate-100">
        <f-table-header
          :headers="headers"
          :loading="loading"
        />
        <f-table-body
          @edit="openEditModal"
          @delete="openDeleteModal"
          :headers="headers"
          :items="list.items"
        />
      </table>
    </div>

    <f-table-footer>
      <span />
      <f-pagination
        v-model="pagination.page"
        :pagination="pagination"
      />
      <p class="text-right text-sm font-bold">
        {{ ItemsCount }} / {{ pagination.count }}
      </p>
    </f-table-footer>
  </div>

  <f-delete-confirmation-modal
    v-model="deleteModal"
    @accept="openDeleteModal(rowToDelete, false)"
  >
    <template #default="{ closeModal: closeDeleteConfirmationModal }">
      <slot
        name="delete-confirmation-modal"
        v-bind="{ closeDeleteConfirmationModal }"
      />
    </template>
  </f-delete-confirmation-modal>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { Table } from '@/types'
import { FormModes } from '@/types'
import { createHeaders, deleteRecord, fillFieldsWithRecordValues, getRecords, resetModelValue, retrieveRecord } from '@/composables'

const props = defineProps<{
  table: Table
  formModal?: boolean
  deleteConfirmationModal?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:formModal', value: boolean): void
}>()

const form = reactive(props.table.form)

const cloneForm = _.cloneDeep(form)
const headers = createHeaders(form.fields)
const formModal = ref(Boolean(props.formModal))

const rowToDelete = ref<any>(null)
const deleteModal = ref(Boolean(props.deleteConfirmationModal))

const { list, loading, fetchItems, pagination } = getRecords({
  url: props.table.settings.url,
  _search: props.table.settings.search,
  initialFilterParams: props.table.settings.filterParams,
  pagination: props.table.settings.pagination,
})

const ItemsCount = computed(() => {
  let count = pagination.rowsPerPage - list.items.length

  if (count === 0)
    count = pagination.page * pagination.rowsPerPage

  else
    count = pagination.count

  return count
})

const closeModal = () => (formModal.value = false)

const openCreateModal = () => {
  if (typeof form.settings.buttons.aux.onClick !== 'function')
    form.settings.buttons.aux.onClick = closeModal

  form.settings.mode = FormModes.CREATE_MODE
  resetModelValue(form, cloneForm)
  formModal.value = true
}

const openEditModal = (row: any) => {
  resetModelValue(form, cloneForm)

  type rowKey = keyof typeof row
  const lookupField = (props.table.settings.lookupField || form.settings.lookupField) as rowKey
  let lookupValue = ''

  if (Object.prototype.hasOwnProperty.call(row, lookupField))
    lookupValue = String(row[lookupField])

  if (typeof form.settings.buttons.aux.onClick !== 'function')
    form.settings.buttons.aux.onClick = closeModal

  retrieveRecord({ url: props.table.settings.url, lookupValue }).then((response) => {
    form.record = response.value.data
    form.settings.mode = FormModes.UPDATE_MODE
    fillFieldsWithRecordValues(form.fields, form.record || {})
    formModal.value = true
  })
}

const openDeleteModal = (row: any, requestDeleteConfirmation = true) => {
  if (requestDeleteConfirmation) {
    rowToDelete.value = row
    deleteModal.value = true
    return
  }

  type rowKey = keyof typeof row
  const lookupField = (props.table.settings.lookupField || form.settings.lookupField) as rowKey
  let lookupValue = ''

  if (Object.prototype.hasOwnProperty.call(row, lookupField))
    lookupValue = String(row[lookupField])

  deleteRecord({
    url: props.table.settings.url,
    lookupValue,
    fieldName: 'is_active',
    hardDelete: false,
  }).then(() => fetchItems())
}

watch(() => props.formModal, () => {
  formModal.value = Boolean(props.formModal)
})

watch(formModal, () => {
  emit('update:formModal', formModal.value)
})
</script>
