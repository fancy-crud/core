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
import { z } from 'zod';

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

    },
    gender: {
      type: FieldType.select,
      label: 'Gender',
      rules: value => ({ value, rule: z.string().nonempty() }),
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
  settings: {
    url: 'artists/',
    title: '{{ Crear artista | Actualizar artista }}',
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
    is_active: {
      input: {
        type: FieldType.checkbox,
        isEnable: true,
      },
    },
    actions: { value: 'actions', label: '', align: 'right' },
  },
  settings: {
    url: 'artists/',
    lookupField: 'id',
  },
  pagination: {
    rowsPerPage: 10,
  },
})
</script>
