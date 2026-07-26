<template>
  <div class="pb-5">
    <f-table v-bind="table">
    </f-table>
  </div>
</template>

<script lang='ts' setup>
import { FieldType, useForm, useTable } from '@fancy-crud/vue'
import { z } from 'zod'

const displayDialog = ref(false)

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
      options: ['m', 'f'],
      multiple: false,
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
      url: 'artists/',
      title: '{{ Crear artista | Actualizar artista }}',
      lookupField: 'id',
    }
  },
  responseInterceptor: {
    201: (response: any) => {
      displayDialog.value = false
      return response
    },
  }
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
        isEnable: true
      }
    },
    actions: { value: 'actions', label: '', align: 'left' },
  },
  settings: () => ({
    url: 'artists/',
    displayFormDialog: displayDialog.value,
  }),
  pagination: {
    rowsPerPage: 10,
  },
})
</script>
