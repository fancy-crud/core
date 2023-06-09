<template>
  <f-form v-bind="form" />

  <p class="p-10 mt-10 border">
    {{ form.fields.date.modelValue }}
  </p>
</template>

<script lang='ts' setup>
import { FieldType } from '@fancy-crud/core'
import { useForm } from '@/forms/integration/composables'

const form = useForm({
  fields: {
    date: {
      label: 'Date',
      placeholder: 'Seleccionar',
      type: FieldType.datepicker,
      wrapper: {
        class: 'col-span-12',
      },
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
