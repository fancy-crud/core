<template>
  <o-select v-model="state.pagination.perPage">
    <option
      v-for="rowsPerPage in props.pagination.rowsPerPageOptions"
      v-close-popup
      @click="state.pagination.perPage = rowsPerPage" :key="rowsPerPage" clickable :value="rowsPerPage"
    >
      {{ rowsPerPage }}
    </option>
  </o-select>

  <o-pagination
    v-model:current="state.pagination.page"
    :total="props.pagination.count"
    :per-page="state.pagination.perPage"

    :range-before="3"
    :range-after="3"

    order="centered"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  />
</template>

<script lang="ts" setup>
import { OSelect } from '@oruga-ui/oruga-next'
import type { TableFooterEmit, TableFooterProps } from '@fancy-crud/vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()
const state = useTableFooter(props.pagination, emit)
</script>
