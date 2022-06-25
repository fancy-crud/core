<template>
  <f-table :table="table">
    <template #table-header-prepend>
      <f-filter :filters="filters" />
    </template>
  </f-table>
  testing semantic-release
</template>

<script lang='ts' setup>
import { useFilters, useForm, useFormats, useTable } from '@/composables'

const formats = useFormats()

const createdAtTable = {
  format: (value: unknown) => formats.dateTimeFormat(value as string),
  exclude: false,
}

const { filters, filterParams } = useFilters({
  search: {
    placeholder: 'Filtrar artista',
    wrapCols: 'col-span-3',
    bounceTime: 700,
  },
})

const form = useForm({
  id: 'formulario',
  fields: {
    name: {
      label: 'Name',
      xlsx: {
        label: 'Nombre',
      },
    },
    created_at: {
      label: 'Created at',
      table: { ...createdAtTable },
      xlsx: { ...createdAtTable },
    },
  },
  settings: {
    url: 'artists/',
    title: {
      create: 'Crear artista',
    },
  },
})

const table = useTable({
  form,
  settings: {
    url: form.settings.url,
    filterParams,
    pagination: {
      rowsPerPage: 10,
    },
  },
})
</script>
