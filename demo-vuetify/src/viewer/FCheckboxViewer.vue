<template>
  <div>
    <f-form v-bind="form" />
  </div>

  <div class="p-10 mt-10 border">
    {{ form.fields.checkbox.modelValue }}
  </div>

  <button @click="resetFields" class="px-8 py-4 bg-primary-500 text-white font-bold">
    Reset
  </button>

  <div class="pt-10">
    <f-checkbox :form-id="form.id" :field="form.fields.checkbox" />
  </div>
</template>

<script lang='ts' setup>
import { FCheckbox, useForm } from '@fancy-crud/vue'
import { Bus, ResetFieldsByFormIdCommand } from '@fancy-crud/core'

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
]

// const options = [
//   { label: 'Option 1', value: 'option-1' },
//   { label: 'Option 2', value: 'option-2' },
//   { label: 'Option 3', value: 'option-3' },
// ]

const bus = new Bus()

const form = useForm({
  id: 'checkbox-field',
  fields: {
    checkbox: {
      label: 'Checkbox',
      type: 'checkbox',
      multiple: true,
      modelValue: [],
      optionLabel: 'label',
      optionValue: 'value',
      options,
      inRowDisplay: true,
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
