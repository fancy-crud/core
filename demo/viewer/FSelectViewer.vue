<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-52 border">
    {{ form.fields.select.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { FieldType } from '@fancy-crud/core'
import { useForm } from '@/forms/integration/composables'

const options = [
  { id: 6, name: 'vas', gender: 'm', image: null, image2: null, is_active: true, created_at: '2022-03-26T16:53:32.689923-06:00', updated_at: '2022-04-04T22:41:03.560384-06:00' },
  { id: 2, name: 'Richa', gender: 'm', image: 'http://localhost:9000/media/artists/XIAOMI.jpg', image2: null, is_active: false, created_at: '2021-11-25T06:03:05.227235-06:00', updated_at: '2022-05-01T19:34:58.233543-06:00' },
  { id: 3, name: 'Hello', gender: 'f', image: null, image2: null, is_active: false, created_at: '2022-03-13T21:56:36.572596-06:00', updated_at: '2022-05-01T19:34:57.473746-06:00' },
  { id: 4, name: 'days', gender: 'm', image: null, image2: null, is_active: true, created_at: '2022-03-24T12:13:53.170353-06:00', updated_at: '2022-05-01T19:34:43.246611-06:00' },
  { id: 8, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:22.381332-06:00', updated_at: '2022-03-27T12:29:22.381388-06:00' },
  { id: 9, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:58.391627-06:00', updated_at: '2022-03-27T12:29:58.391713-06:00' },
  { id: 1, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:58.391627-06:00', updated_at: '2022-03-27T12:29:58.391713-06:00' },
  { id: 2, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:58.391627-06:00', updated_at: '2022-03-27T12:29:58.391713-06:00' },
  { id: 3, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:58.391627-06:00', updated_at: '2022-03-27T12:29:58.391713-06:00' },
  { id: 4, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:58.391627-06:00', updated_at: '2022-03-27T12:29:58.391713-06:00' },
  { id: 5, name: 'dsa', gender: 'f', image: null, image2: null, is_active: true, created_at: '2022-03-27T12:29:58.391627-06:00', updated_at: '2022-03-27T12:29:58.391713-06:00' },
]

const form = useForm({
  fields: {
    select: {
      label: 'Select',
      type: FieldType.select,
      // url: 'artists/',
      placeholder: 'Select',
      optionLabel: 'name',
      optionValue: 'id',
      chips: true,
      filterParams: {
        limit: 10,
      },
      wrapper: {
      },
      clearable: true,
      modelValue: null,
      options,
    },
  },
  settings: {
    url: 'artists/',
  },
})
</script>
