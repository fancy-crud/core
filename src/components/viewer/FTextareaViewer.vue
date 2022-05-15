<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.textarea.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'textarea-field',
  fields: {
    textarea: {
      label: 'Textarea',
      type: 'textarea',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
