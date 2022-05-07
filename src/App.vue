<template>
  <div class="p-5">
    <f-button>
      Create a new Element
    </f-button>
  </div>
</template>

<script lang="ts" setup>
import { createForm, createTable } from './composables'
import { FormModes } from '@/types'

const value = ref('')
const loading = ref(false)
const persistent = ref(false)

function onClick(e: Event) {
  loading.value = !loading.value
}

const field = reactive({
  modelKey: 'custom-field',
  modelValue: 'Christopher Flores',
  errors: [],
})

const form = createForm({
  id: 'formulario',
  fields: {
    name: {
      label: 'Nombre',
      placeholder: 'Vale este es el placeholder',
    },
    gender: {
      label: 'Sexo',
    },
    image: {
      label: 'Imágen',
      type: 'image',
    },
    created_at: {
      label: 'Fecha creacion',
      type: 'date',
    },
    updated_at: {
      label: 'Ultima actualización',
      type: 'date',
    },
    is_active: {
      label: 'Activo',
      modelValue: [],
      type: 'radio',
      class: 'in-row',
      optionLabel: 'label',
      optionValue: 'id',
      options: [
        { label: 'Valor1', id: 1 },
        { label: 'Valor2', id: 2 },
        { label: 'Valor3', id: 3 },
      ],
    },
  },
  settings: {
    url: 'artists/',
  },
})

const table = createTable({
  form,
  settings: {
    url: form.settings.url,
    pagination: {
      rowsPerPage: 2,
    },
  },
})

// setTimeout(() => {
//   table.form.fields.name.modelValue = 'Hello'
// }, 6000)

</script>
