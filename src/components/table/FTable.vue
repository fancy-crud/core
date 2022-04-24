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
      <div class="flex items-center">
        <div
          class="tooltip tooltip-left"
          data-tip="locale.t('create')"
        >
          <f-modal
            v-model="displayModal"
          >
            <template #activator>
              <f-button-icon
                @click="openCreateModal"
                icon="mdi-plus"
              />
            </template>
            <f-modal-card>
              <f-form :form="form" />
            </f-modal-card>
          </f-modal>
        </div>
        <div
          class="tooltip tooltip-left"
          data-tip="Exportar"
        >
          <f-button-icon icon="mdi-microsoft-excel" />
        </div>
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
</template>

<script lang="ts" setup>
import _ from 'lodash'
import { FormModes } from '@/types'
import { createHeaders, fillFieldsWithRecordValues, getRecords, resetModelValue, retrieveRecord, setFormMode, setFormRecord } from '@/composables'

const props = defineProps<{
  table: Table
  modal?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modal', value: boolean)
}>()

const form = reactive(props.table.form)

const cloneForm = _.cloneDeep(form)
const headers = createHeaders(form.fields)
const displayModal = ref(props.modal || false)

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

const closeModal = () => (displayModal.value = false)

const openCreateModal = () => {
  if (typeof form.settings.buttons.aux.onClick !== 'function')
    form.settings.buttons.aux.onClick = closeModal

  form.settings.mode = FormModes.CREATE_MODE
  resetModelValue(form, cloneForm)
  displayModal.value = true
}

const openEditModal = (row: unknown) => {
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
    displayModal.value = true
  })
}

watch(() => props.modal, () => {
  displayModal.value = props.modal
})

watch(displayModal, () => {
  emit('update:modal', displayModal.value)
})
</script>
