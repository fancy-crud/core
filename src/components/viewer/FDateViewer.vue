<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.date.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@/composables'

const form = useForm({
  id: 'date-field',
  fields: {
    date: {
      label: 'Date',
      placeholder: 'Seleccionar',
      type: 'date',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
