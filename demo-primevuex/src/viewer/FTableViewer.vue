<template>
  <div class="pb-5">
    {{ form.settings.url }}
    <div>
      <f-form v-bind="form" />
      <f-table v-bind="table">
        <template #before-field-name>
          <input v-model="randomText" type="text" class="border px-4 py-2">
        </template>
      </f-table>
    </div>
  </div>
  <input v-model="randomText" type="text" class="border px-4 py-2">
  <br>
  <br>
</template>

<script lang='ts' setup>
import type { RecordObject } from '@fancy-crud/vue'
import { FieldType, LoadRemoteRecordCommand, useForm, useTable } from '@fancy-crud/vue'
interface Artist {
  name: string
  gender: string
  created_at: string
}

const randomText = ref('First name')
const form = useForm({
  id: 'formulario',
  record: {} as RecordObject<Artist>,
  fields: {
    name: {
      type: FieldType.text,
      label: randomText.value,
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
    tu: {
      type: FieldType.text,
      label: 'Tu',
      modelValue: 1,
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
  settings: (form) => {
    return {
      url: '{{ artists/ | artists/:name }}',
      title: '{{ Crear artista | Actualizar artista }}',
      count: randomText.value,
    }
  },
})

form.bus.execute(
  new LoadRemoteRecordCommand(form.id, 2),
)

const table = useTable({
  form,
  columns: {
    name: {
      label: 'Name',
      format: (value: string) => value.toUpperCase(),
    },
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
    url: 'artists/',
  },
  pagination: {
    rowsPerPage: 10,
  },
  filterParams: {
    gender: '',
  },
  buttons: {
    edit: {},
  },
})
</script>
