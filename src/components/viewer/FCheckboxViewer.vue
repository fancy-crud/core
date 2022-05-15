<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.checkbox.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'checkbox-field',
  fields: {
    checkbox: {
      label: 'Checkbox',
      type: 'checkbox',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
