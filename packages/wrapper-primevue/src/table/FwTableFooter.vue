<template>
  
    <Select 
      v-model="state.pagination.perPage" 
      :options="props.pagination.rowsPerPageOptions"
      class="w-20"
    />
    <!-- <div> -->
      <Paginator
        v-model:first="firstRecord"
        :rows="state.pagination.perPage"
        :totalRecords="props.pagination.count"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    <!-- </div> -->
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Select from 'primevue/select'
import Paginator from 'primevue/paginator'
import type { TableFooterEmit, TableFooterProps } from '@fancy-crud/vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()
const state = useTableFooter(props.pagination, emit)

const firstRecord = computed({
  get: () => (state.pagination.page - 1) * state.pagination.perPage,
  set: (value) => {
    state.pagination.page = Math.floor(value / state.pagination.perPage) + 1
  }
})
</script>
