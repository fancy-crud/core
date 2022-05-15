<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.input.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'input-field',
  fields: {
    input: {
      label: 'Text',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
