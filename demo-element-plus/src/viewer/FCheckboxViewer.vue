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
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

const bus = new Bus()

const form = useForm({
  id: 'checkbox-field',
  fields: {
    terms: {
      label: 'By clicking this checkbox, you agree to our terms and conditions',
      type: 'checkbox',
      inRow: true,
      modelValue: false,
    },
    checkbox: {
      label: 'Checkbox',
      type: 'checkbox',
      inRow: true,
      options: [true],
    },
    artists: {
      label: 'Artists',
      type: 'checkbox',
      multiple: true,
      optionLabel: 'label',
      optionValue: 'value',
      options,
      modelValue: ['option-1'],
    },
    artists2: {
      label: 'Artists 2',
      type: 'checkbox',
      multiple: true,
      optionLabel: 'name',
      optionValue: 'id',
      url: 'artists/',
      modelValue: ['option-1'],
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
