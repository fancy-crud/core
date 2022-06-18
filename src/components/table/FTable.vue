<template>
  <div class="card bg-base-100 border rounded-md">
    <div class="flex flex-nowrap p-4 items-center justify-between">
      <div>
        <slot name="table-header-prepend" />
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
          <f-modal-card
            class="p-5"
            max-width="max-w-3xl"
          >
            <f-form
              @create="fetchItems()"
              @update="fetchItems()"
              :key="formModalKey"
              :form="props.table.form"
            >
              <template #form-header="{ title }">
                <div class="flex justify-between items-center pb-4">
                  <h3 class="text-2xl">
                    {{ title }}
                  </h3>
                  <f-button-icon
                    @click="closeModal"
                    text-color="text-gray-400"
                    icon="mdi-close"
                  />
                </div>
              </template>
            </f-form>
          </f-modal-card>
        </f-modal>
        <f-button-icon
          @click="exportXlsx"
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
      <f-progress-bar v-if="loading" />
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
import { createHeaders, deleteRecord, fillFieldsWithRecordValues, getRecords, resetModelValue, retrieveRecord, updateRecord, useXLSX } from '@/composables'
interface Search {
  value: string
  bounceInterval: NodeJS.Timeout | null
}

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
const formModalKey = ref(0)

const rowToDelete = ref<any>(null)
const deleteModal = ref(false)
const _search: Search = reactive({
  value: '',
  bounceInterval: null,
})

const { list, loading, pagination, fetchItems, search } = getRecords({
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

watch(() => props.formModal, () => {
  formModal.value = Boolean(props.formModal)
})

watch(formModal, () => {
  emit('update:formModal', formModal.value)
})

watch(() => _search.value, (searchValue: string) => {
  if (_search.bounceInterval)
    clearTimeout(_search.bounceInterval)

  _search.bounceInterval = setTimeout(() => {
    search.value = searchValue
  }, 700)
})

fetchItems()

function exportXlsx() {
  const xlsx = useXLSX(props.table)
  xlsx.fetchItems()
}

function closeModal() {
  formModal.value = false
}

function openCreateModal() {
  if (typeof props.table.form.settings.buttons.aux.onClick !== 'function')
    Object.assign(props.table.form.settings.buttons.aux, { onClick: closeModal })

  Object.assign(props.table.form.settings, { mode: FormModes.CREATE_MODE })
  resetModelValue(props.table.form, cloneForm)
  formModal.value = true
}

function openEditModal(row: any) {
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
    })

    Object.assign(props.table.form.settings, {
      mode: FormModes.UPDATE_MODE,
    })

    fillFieldsWithRecordValues(props.table.form.fields, props.table.form.record || {})
    formModalKey.value++
    formModal.value = true
  })
}

function openDeleteModal(row: any, requestDeleteConfirmation = true) {
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

function updateCheckbox(value: { field: string; row: any }) {
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
</script>
