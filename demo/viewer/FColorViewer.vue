<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.color.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@fancy-crud/vue'

const form = useForm({
  id: 'color-field',
  fields: {
    color: {
      label: 'Color',
      type: 'color',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
