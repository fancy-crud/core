<template>
  <div class="p-4">
    <!-- <f-filters /> -->
  </div>
  <div class="p-5">
    <!-- <f-table
      :table="table"
    /> -->

    <f-autocomplete :field="form.fields.name" />

    <!-- {{ state }} -->
  </div>
</template>

<script lang="ts" setup>
import { createForm, createTable } from './composables'

// const loading = ref(false)

// const field = reactive({
//   modelKey: 'custom-field',
//   modelValue: 'Christopher Flores',
//   errors: [],
// })

const state = ref<any[]>([])

const form = createForm({
  id: 'formulario',
  fields: {
    name: {
      label: 'Nombre',
      placeholder: 'Vale este es el placeholder',
      wrapCols: 'col-span-6',
      hintText: 'Este es un mensaje de prueba',
      type: 'autocomplete',
      multiple: true,
      clearable: true,
      // modelValue: [],
      options: [
        { name: 'Perro' },
        { name: 'dog' },
        { name: 'perrin' },
        { name: 'perrin' },
        { name: 'perrin' },
        { name: 'perrin' },
        { name: 'perrin' },
        { name: 'perrin' },
      ],
    },
    // gender: {
    //   label: 'Sexo',
    //   wrapCols: 'col-span-6',
    //   table: {
    //     field: (row: any) => row.gender === 'm' ? 'Masculino' : 'Femenino',
    //   },
    // },
    // image: {
    //   label: 'Imagen',
    //   type: 'image',
    //   readonly: true,
    // },
    // created_at: {
    //   label: 'Fecha creación',
    //   type: 'date',
    //   hidden: true,
    // },
    // updated_at: {
    //   label: 'Ultima actualización',
    //   type: 'date',
    //   hidden: true,
    // },
    // is_active: {
    //   label: 'Activo',
    //   modelValue: null,
    //   type: 'checkbox',
    //   class: 'in-row',
    //   optionLabel: 'label',
    //   optionValue: 'id',
    //   options: [
    //     { label: 'Valor1', id: 1 },
    //     { label: 'Valor2', id: 2 },
    //     { label: 'Valor3', id: 3 },
    //   ],
    // },
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
      rowsPerPage: 5,
    },
  },
})

watch(() => form.fields.name.modelValue, () => {
  console.log(form.fields.name.modelValue)
})

// setTimeout(() => {
//   table.form.fields.name.modelValue = 'Hello'
// }, 6000)

</script>
