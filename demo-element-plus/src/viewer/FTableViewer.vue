<template>
  <div class="pb-5">
    <!-- <f-table
      :columns="table.columns"
      :buttons="table.buttons"
      :form="table.form"
      :settings="table.settings"
      :list="table.list"
      :filter-params="table.filterParams"
      :pagination="table.pagination"
      :id="table.id"
    > -->
    <f-table v-bind="table">
      <template #column-created_at>
        <a href="https://google.com" class="underline text-primary-500" target="_blank">Haz click</a>
      </template>
    </f-table>
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable } from '@fancy-crud/vue'

const form = useForm({
  id: 'formulario',
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'First name',
      wrapper: {
        class: 'col-span-12',
      },
    },
    gender: {
      type: FieldType.text,
      label: 'Gender',
      wrapper: {
        class: 'col-span-12',
      },
    },
    created_at: {
      type: FieldType.text,
      label: 'Created at',
      updateOnly: true,
      readonly: true,
      disabled: true,
      wrapper: {
        class: 'col-span-12',
      },
    },
  },
  settings: {
    url: 'artists/',
    title: '{{ Crear artista | Actualizar artista }}',
  },
})

const table = useTable({
  form,
  columns: {
    gender: {
      format: (value: string) => value === 'm' ? 'Male' : 'Female',
    },
    created_at: {
      format: (value: string) => 'anything',
    },
    actions: { value: 'actions', label: '' },
  },
  pagination: {
    rowsPerPage: 10,
  },
  list: {
    data: [],
    options: {
      onInit() {
        console.log('ok')
      },
    },
  },
})
</script>
