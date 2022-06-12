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
        'Option 1',
        'Option 2',
        'Option 3',
      ],
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
