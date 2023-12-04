<template>
  <v-menu location="bottom">
    <template #activator="{ props: bind }">
      <v-btn
        v-bind="bind"
        append-icon="mdi-chevron-down"
        variant="outlined"
        color="blue-grey"
      >
        {{ state.pagination.perPage }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="rowsPerPage in props.pagination.rowsPerPageOptions"
        @click="state.pagination.perPage = rowsPerPage"
        :key="rowsPerPage"
      >
        <v-list-item-title>{{ rowsPerPage }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-pagination v-model="state.pagination.page" :length="max" :total-visible="11" size="small" />
</template>

<script lang="ts" setup>
import { VBtn, VList, VListItem, VListItemTitle, VMenu, VPagination } from 'vuetify/components'
import type { TableFooterEmit, TableFooterProps } from '@fancy-crud/vue'
import { useTableFooter } from '@fancy-crud/vue'

const props = defineProps<TableFooterProps>()
const emit = defineEmits<TableFooterEmit>()
const state = useTableFooter(props.pagination, emit)

const max = computed(() => Math.ceil(props.pagination.count / state.pagination.perPage))
</script>
