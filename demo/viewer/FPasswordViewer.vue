<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.password.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm } from '@/forms/integration/composables'

const form = useForm({
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
