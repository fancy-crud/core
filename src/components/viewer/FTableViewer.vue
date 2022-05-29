<template>
  <f-table :table="table" />
</template>

<script lang='ts' setup>
import { createForm, createTable } from '@/composables'

const form = createForm({
  id: 'formulario',
  fields: {
    name: {
      label: 'Name',
    },
  },
  settings: {
    url: 'artists/',
  },
})

const table = createTable({
  form,
  settings: {
    url: form.settings.url,
  },
})
</script>
