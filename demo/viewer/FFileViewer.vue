<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.file.modelValue }}
  </div>

  <button @click="openEditModal({ id: 8 })">
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
  let lookupValue = ''

  if (Object.prototype.hasOwnProperty.call(row, form.settings.lookupField))
    lookupValue = String(row[form.settings.lookupField])

  const command = new RequestRetrieveCommand(form.settings.url, lookupValue, {
    onSuccess(response: { data: Record<string, unknown> }) {
      bus.execute(
        new PrepareFormToUpdateCommand(form.id, row, form.settings, {
          onClickAux: () => {},
        }),
      )

      bus.execute(
        new SetFieldsValuesCommand(form.fields, form.settings, response.data || {}),
      )
    },
  })

  bus.execute(command)
}
</script>
