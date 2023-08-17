<template>
  <div class="pb-5">
    <f-table v-bind="table" />
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable } from '@fancy-crud/vue'

// const formats = useFormats()

const form = useForm({
  id: 'formulario',
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'First name',
      wrapper: {
        class: 'col-span-12',
      },
    },
    gender: {
      type: FieldType.text,
      label: 'Gender',
      wrapper: {
        class: 'col-span-12',
      },
    },
    created_at: {
      type: FieldType.text,
      label: 'Created at',
      updateOnly: true,
      readonly: true,
      disabled: true,
      wrapper: {
        class: 'col-span-12',
      },
    },
  },
  settings: {
    url: 'artists/',
  },
  titles: {
    create: 'Crear artista',
  },
})

const table = useTable({
  form,
  columns: {
    gender: {
      format: (value: unknown) => value === 'm' ? 'Male' : 'Female',
    },
    created_at: {
      // format: (value: unknown) => formats.dateTimeFormat(value as string),
    },
    actions: { value: 'actions', label: '' },
  },
  settings: {
    url: form.settings.url,
    lookupField: 'id',
  },
  pagination: {
    rowsPerPage: 10,
  },
})

setTimeout(() => {
  form.fields.name.placeholder = 'Vaya vaya'
}, 3000)
</script>
