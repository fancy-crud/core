<template>
  <f-table :table="table" />
</template>

<script lang='ts' setup>
import { createForm, createTable, useFormats } from '@/composables'

const formats = useFormats()

const createdAtTable = {
  format: (value: unknown) => formats.dateTimeFormat(value as string),
  exclude: false,
}

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
      xlsx: { ...createdAtTable, exclude: true },
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
    filterParams: {
      search: 'Base',
    },
    pagination: {
      rowsPerPage: 50,
    },
  },
})
</script>
