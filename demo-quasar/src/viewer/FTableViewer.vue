<template>
  <div class="pb-5">
    <f-table v-bind="table">
      <template #column-created_at>
        <a href="https://google.com" class="underline text-primary-500" target="_blank">Haz click</a>
      </template>
    </f-table>
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable, FORM_MODE } from '@fancy-crud/vue'
import { z } from 'zod'

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
      type: FieldType.select,
      label: 'Gender',
      rules: (value: any) => ({ value, rule: z.string().nonempty() }),
      multiple: true,
      exclude: true,
      wrapper: {
        class: 'col-span-6',
      },
    },
    image2: {
      type: FieldType.file,
      label: 'Imagen',
      preview: true,
      wrapper: {
        class: 'col-span-6',
      },
    },
    created_at: {
      type: FieldType.datepicker,
      label: 'Created at',
      updateOnly: true,
      readonly: true,
      disabled: true,
      wrapper: {
        class: 'col-span-12',
      },
    },
    is_active: {
      type: FieldType.checkbox,
      label: 'Is active',
      modelValue: false,
      wrapper: {
        class: 'col-span-12',
      },
    },
  },
  settings: (f) => {
    return {
      url: f?.settings.mode === FORM_MODE.update ? `artists/${f.record.value?.id}/` : 'artists/',
      title: '{{ Crear artista | Actualizar artista }}',
      lookupField: null,
    }
  },
})

const table = useTable({
  form,
  columns: {
    name: {
    },
    gender: {
      format: (value: unknown) => value === 'm' ? 'Male' : 'Female',
    },
    image2: {
      label: 'Image',
      input: {
        isEnable: true,
        type: FieldType.image,
      },
    },
    created_at: {
      format: (value: unknown) => 'Lo que sea',
    },
    actions: { value: 'actions', label: '', align: 'left' },
  },
  settings: {
    url: 'artists/',
    columnsOrder: ['actions', '...'],
  },
  pagination: {
    rowsPerPage: 10,
  },
})
</script>
