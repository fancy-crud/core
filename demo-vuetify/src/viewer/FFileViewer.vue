<template>
  <div>
    <f-form v-bind="form" />
  </div>

  <div class="p-10 mt-10 border mb-4">
    {{ form.fields.file.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@fancy-crud/vue'

const form = useForm({
  id: 'file-field',
  fields: {
    file: {
      label: 'File',
      type: 'file',
      placeholder: 'Subir archivo',
      multiple: true,
      chips: true,
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
