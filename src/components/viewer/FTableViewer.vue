<template>
  <f-table :table="table" />
</template>

<script lang='ts' setup>
import { createForm, createTable, useFilters, useFormats } from '@/composables'

const formats = useFormats()

const createdAtTable = {
  format: (value: unknown) => formats.dateTimeFormat(value as string),
  exclude: false,
}

const { filterParams } = useFilters({
  search: {
    placeholder: 'Filtrar artista',
    wrapCols: 'col-span-3',
    modelValue: 'Many',
  },
})

const form = createForm({
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

const table = createTable({
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
