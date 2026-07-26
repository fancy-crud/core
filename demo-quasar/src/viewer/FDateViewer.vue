<template>
  <div>
    <f-form v-bind="form" />
  </div>

  <p class="p-10 mt-10 border">
    {{ form.fields.date.modelValue }}
  </p>
</template>

<script lang='ts' setup>
import { FieldType, useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    date: {
      label: 'Date',
      placeholder: 'Seleccionar',
      type: FieldType.datepicker,
      wrapper: {
        class: 'col-span-6',
      },
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
