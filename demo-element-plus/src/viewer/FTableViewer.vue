<template>
  <div class="pb-5">
    <f-table v-bind="table" />
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable } from '@fancy-crud/vue'

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
      modelValue: 'John',
    },
    gender: {
      type: FieldType.select,
      label: 'Select',
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { label: 'Male', value: 'm' },
        { label: 'Female', value: 'f' },
      ],
      modelValue: 'm',
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
    title: '{{ Crear artista | Actualizar artista }}',
  },
})

const table = useTable({
  form,
  columns: {
    gender: {
      format: (value: string) => value === 'm' ? 'Male' : 'Female',
      width: 700,
    },
    created_at: {
      format: (value: string) => 'anything',
    },
    actions: { value: 'actions', label: '', width: '200px', align: 'right' },
  },
  pagination: {
    rowsPerPage: 10,
    // hidden: true,
  },
  filterParams: {
    gender: '',
  },
  buttons: {
    edit: {
      // onClick(row) {
      //   console.log('🚀 ~ onClick ~ row:', row)
      // },
    },
  },
})
</script>
