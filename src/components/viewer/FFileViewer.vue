<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.file.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'file-field',
  fields: {
    file: {
      label: 'File',
      type: 'file',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
