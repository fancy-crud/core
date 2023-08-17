<template>
  <f-form v-bind="form" />

  <div class="p-10 mt-10 border">
    {{ form.fields.textarea.modelValue }}
  </div>
  <button @click="resetFields" class="px-8 py-4 bg-primary-500 text-white font-bold">
    Reset
  </button>
</template>

<script lang='ts' setup>
import { useForm } from '@fancy-crud/vue'
import { Bus, ResetFieldsByFormIdCommand } from '@fancy-crud/core'

const bus = new Bus()

const form = useForm({
  id: 'textarea-field',
  fields: {
    textarea: {
      label: 'Textarea',
      type: 'textarea',
    },
  },
  settings: {
    url: 'artists/',
  },
})

function resetFields() {
  bus.execute(
    new ResetFieldsByFormIdCommand(form.id),
  )
}
</script>
