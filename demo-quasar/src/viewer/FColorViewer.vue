<template>
  <div>
    <f-form v-bind="form" />
  </div>

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
      hideCanvas: true,
      hideSliders: true,
      flat: true,
      elevation: 0,
      wrapper: {
        class: 'col-span-12 full-width',
      },
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
