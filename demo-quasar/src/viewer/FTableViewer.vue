<template>
  <q-input v-model="r" />
  <div class="pb-5">
    <f-table v-bind="table">
      <template #column-created_at>
        <a href="https://google.com" class="underline text-primary-500" target="_blank">Haz click</a>
      </template>
    </f-table>

    <!-- <q-btn icon="plus" /> -->
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable } from '@fancy-crud/vue'

// const formats = useFormats()

const r = ref(1)

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
      parseModelValue: Number,
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
    title: '{{ Crear artista | Actualizar artista }}',
  },
})

const table = useTable({
  form,
  columns: {
    gender: {
      format: (value: unknown) => value === 'm' ? 'Male' : 'Female',
    },
    created_at: {
      format: (value: unknown) => 'Lo que sea',
    },
    actions: { value: 'actions', label: '', align: 'right' },
  },
  settings: {
    url: form.settings.url,
    lookupField: 'id',
  },
  pagination: {
    rowsPerPage: 10,
  },
})
</script>
