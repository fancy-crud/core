<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.file.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@/forms/integration/composables'

const form = useForm({
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
