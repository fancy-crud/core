<template>
  <div class="flex items-center justify-between gap-4 p-4">
    <div class="flex items-center gap-2">
      <q-btn-dropdown :label="state.pagination.perPage" color="blue-grey" outline size="sm">
        <q-list>
          <q-item
            v-for="rowsPerPage in props.pagination.rowsPerPageOptions"
            v-close-popup
            @click="state.pagination.perPage = rowsPerPage" :key="rowsPerPage" clickable
          >
            <q-item-section>
              <q-item-label>{{ rowsPerPage }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <q-pagination
      v-model="state.pagination.page" :max="max" direction-links
      color="grey"
      active-color="primary"
      boundary-links
      :max-pages="11"
      unelevated
      outline
    />
  </div>
</template>

<script lang="ts" setup>
import { QBtnDropdown, QItem, QItemLabel, QItemSection, QList, QPagination, ClosePopup as vClosePopup } from 'quasar'
import type { TableFooterEmit, TableFooterProps } from '@fancy-crud/vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()
const state = useTableFooter(props.pagination, emit)

const max = computed(() => Math.ceil(props.pagination.count / state.pagination.perPage))
</script>
