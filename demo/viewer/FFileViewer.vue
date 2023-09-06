<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.file.modelValue }}
  </div>

  <button @click.prevent="openEditModal({ id: 8 })">
    Load id
  </button>

  <button @click="form.fields.description.modelValue = null">
    Nullish
  </button>
</template>

<script lang='ts' setup>
import { useForm } from '@fancy-crud/vue'
import { Bus, PrepareFormToUpdateCommand, RequestRetrieveCommand, SetFieldsValuesCommand } from '@fancy-crud/core'

const bus = new Bus()

const form = useForm({
  id: 'file-field',
  fields: {
    file: {
      label: 'File',
      type: 'file',
    },
    gender: {
      type: 'text',
      modelValue: 'm',
      hidden: true,
    },
    name: {
      type: 'text',
      modelValue: 'test',
      hidden: true,
    },
    description: {
      label: 'text',
      type: 'text',
    },
  },
  settings: {
    url: 'artists/',
  },
})

function openEditModal(row: Record<string, any>) {
  bus.execute(
    new PrepareFormToUpdateCommand(form.id, row, form.settings, {
      onClickAux: () => {},
    }),
  )
}
</script>
