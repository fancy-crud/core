<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.image.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@/forms/integration/composables'

const form = useForm({
  id: 'image-field',
  fields: {
    image: {
      label: 'Image',
      type: 'image',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
