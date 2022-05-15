<template>
  <f-form :form="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.password.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { createForm } from '@/composables'

const form = createForm({
  id: 'password-field',
  fields: {
    password: {
      label: 'Password',
      type: 'password',
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
