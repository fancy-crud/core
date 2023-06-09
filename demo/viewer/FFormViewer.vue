<template>
  <div>
    <f-form v-bind="form" />
  </div>
</template>

<script setup lang='ts'>
import { useForm } from '@/forms/integration/composables'

const form = useForm({
  id: 'select-field',
  fields: {
    name: {
      label: 'Genre name',
      type: 'textarea',
      // multiple: true,
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { label: 'Valor 1', value: 1 },
        { label: 'Valor 2', value: 2 },
      ],
    },
  },
  settings: {
    url: 'genres/',
  },
})
</script>
