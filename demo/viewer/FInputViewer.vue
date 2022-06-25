<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.input.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@/composables'

const form = useForm({
  id: 'input-field',
  fields: {
    input: {
      label: 'Text',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
