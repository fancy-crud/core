<template>
  <div>
    <f-form v-bind="form" />
  </div>

  <div class="p-10 mt-10 border">
    {{ form.fields.radio.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@fancy-crud/vue'

const form = useForm({
  id: 'radio-field',
  fields: {
    radio: {
      label: 'Radio',
      type: 'radio',
      inRow: true,
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        // 'Option 2',
        // 'Option 3',
      ],
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
