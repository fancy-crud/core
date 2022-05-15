<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.date.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'date-field',
  fields: {
    date: {
      label: 'Date',
      type: 'date',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
