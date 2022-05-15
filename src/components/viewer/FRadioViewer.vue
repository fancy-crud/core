<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.radio.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'radio-field',
  fields: {
    radio: {
      label: 'Radio',
      type: 'radio',
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { value: 1, label: 'Opción 1' },
        { value: 2, label: 'Opción 2' },
        { value: 3, label: 'Opción 3' },
      ],
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
