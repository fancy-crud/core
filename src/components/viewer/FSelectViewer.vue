<template>
  <f-form :form="form" />

  <!-- <f-select :field="form.fields.select" /> -->

  <div class="p-10 mt-52 border">
    {{ form.fields.select.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const options = [
  { id: 1, name: 'Honduras' },
  { id: 2, name: 'Guatemala' },
  { id: 3, name: 'El Salvador' },
]
// const options = [
//   'Honduras',
//   'Guatemala',
//   'El Salvador',
// ]

const form = createForm({
  id: 'select-field',
  fields: {
    select: {
      label: 'Select',
      type: 'autocomplete',
      placeholder: 'Select',
      optionLabel: 'name',
      optionValue: 'id',
      clearable: true,
      modelValue: [options[0]],
      multiple: true,
      options,
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
