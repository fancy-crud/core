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
          class="pb-10"
        >
          <template #activator>
            <f-button-icon
              @click="openCreateModal"
              tooltip="Crear nuevo"
              icon="mdi-plus"
            />
          </template>
          <f-modal-card
            max-width="max-w-3xl"
          >
            <f-form
              @create="fetchItems()"
              @update="fetchItems()"
              :form="props.table.form"
            />
          </f-modal-card>
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
          @hot-update="updateCheckbox"
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
import { createHeaders, deleteRecord, fillFieldsWithRecordValues, getRecords, resetModelValue, retrieveRecord, updateRecord } from '@/composables'

const props = defineProps<{
  table: Table
  formModal?: boolean
  skipDeleteConfirmation?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:formModal', value: boolean): void
}>()

const cloneForm = _.cloneDeep(props.table.form)
const headers = createHeaders(props.table.form.fields)
const formModal = ref(Boolean(props.formModal))

const rowToDelete = ref<any>(null)
const deleteModal = ref(false)

const { list, loading, pagination, fetchItems } = getRecords({
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
  if (typeof props.table.form.settings.buttons.aux.onClick !== 'function')
    Object.assign(props.table.form.settings.buttons.aux, { onClick: closeModal })

  Object.assign(props.table.form.settings, { mode: FormModes.CREATE_MODE })
  resetModelValue(props.table.form, cloneForm)
  formModal.value = true
}

const openEditModal = (row: any) => {
  resetModelValue(props.table.form, cloneForm)

  type rowKey = keyof typeof row
  const lookupField = (props.table.settings.lookupField || props.table.form.settings.lookupField) as rowKey
  let lookupValue = ''

  if (Object.prototype.hasOwnProperty.call(row, lookupField))
    lookupValue = String(row[lookupField])

  if (typeof props.table.form.settings.buttons.aux.onClick !== 'function')
    Object.assign(props.table.form.settings.buttons.aux, { onClick: closeModal })

  retrieveRecord({ url: props.table.settings.url, lookupValue }).then((response) => {
    Object.assign(props.table.form, {
      record: response.value.data,
      mode: FormModes.UPDATE_MODE,
    })
    fillFieldsWithRecordValues(props.table.form.fields, props.table.form.record || {})
    formModal.value = true
  })
}

const openDeleteModal = (row: any, requestDeleteConfirmation = true) => {
  if (requestDeleteConfirmation && !props.skipDeleteConfirmation) {
    rowToDelete.value = row
    deleteModal.value = true
    return
  }

  type rowKey = keyof typeof row
  const lookupField = (props.table.settings.lookupField || props.table.form.settings.lookupField) as rowKey
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

const updateCheckbox = (value: { field: string; row: any }) => {
  type rowKey = keyof typeof value.row
  const lookupField = (props.table.settings.lookupField || props.table.form.settings.lookupField) as rowKey
  let lookupValue = ''

  if (Object.prototype.hasOwnProperty.call(value.row, lookupField))
    lookupValue = String(value.row[lookupField])

  updateRecord({
    url: props.table.settings.url,
    lookupValue,
    form: {
      [value.field]: !value.row[value.field],
    },
  })
}

watch(() => props.formModal, () => {
  formModal.value = Boolean(props.formModal)
})

watch(formModal, () => {
  emit('update:formModal', formModal.value)
})
</script>
