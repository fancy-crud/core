<template>
  <div class="pb-5">
    <f-form v-bind="form" />
    <f-table v-bind="table">
      <template #before-field-name>
        <input v-model="randomText" type="text" class="border px-4 py-2">
      </template>
    </f-table>
  </div>
  <input v-model="randomText" type="text" class="border px-4 py-2">
  <br>
  <br>
  {{ randomText }}
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable } from '@fancy-crud/vue'

const randomText = ref('First name')

const form = useForm({
  id: 'formulario',
  fields: () => ({
    name: {
      type: FieldType.text,
      label: randomText.value,
      placeholder: 'First name',
      wrapper: {
        class: 'col-span-12',
      },
      exclude: true,
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
      hidden: true,
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
  }),
  settings: {
    url: 'artists/',
    title: '{{ Crear artista | Actualizar artista }}',
  },
})

const table = useTable({
  form,
  columns: {
    gender: {
      label: 'Gender',
      format: (value: string) => value === 'm' ? 'Male' : 'Female',
    },
    created_at: {
      label: 'Created at',
      format: (value: string) => 'anything',
    },
    updated_at: {
      label: 'Updated at',
    },
    actions: { value: 'actions', label: '', width: '200px', align: 'left' },
  },
  settings: {
    // columnsOrder: ['actions', 'name', 'updated_at', '...'],
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
