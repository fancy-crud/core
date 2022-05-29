<template>
  <div>
    <f-form :form="form" />
  </div>
</template>

<script setup lang='ts'>
import { createForm } from '@/composables'

const form = createForm({
  id: 'select-field',
  fields: {
    name: {
      label: 'Genre name',
    },
  },
  settings: {
    url: 'genres/',
  },
})
</script>
