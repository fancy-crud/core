<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.textarea.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@/forms/integration/composables'

const form = useForm({
  id: 'textarea-field',
  fields: {
    textarea: {
      label: 'Textarea',
      type: 'textarea',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
