<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border mb-4">
    {{ form.fields.file.modelValue }}
  </div>

  <f-button @click.prevent="openEditModal({ id: 8 })" class="bg-primary-500 text-white" borderless>
    Load id
  </f-button>

  <span class="pl-4">
    <f-button @click="form.fields.description.modelValue = null" class="bg-primary-500 text-white" borderless>
      Nullish
    </f-button>
  </span>
</template>

<script lang='ts' setup>
import { useForm } from '@fancy-crud/vue'
import { Bus, PrepareFormToUpdateCommand } from '@fancy-crud/core'

const bus = new Bus()

const form = useForm({
  id: 'file-field',
  fields: {
    file: {
      label: 'File',
      type: 'file',
      placeholder: 'Subir archivo',
      multiple: true,
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
