<template>
  <div class="bg-white rounded-xl p-4">
    <f-form v-bind="form">
      <template #form-footer="bind">
        <f-form-footer v-bind="bind" />
      </template>
    </f-form>
  </div>
  <input v-model="title">
</template>

<script lang='ts' setup>
import { FieldType, useForm, FFormFooter } from '@fancy-crud/vue'
import { Bus, ResetFieldsByFormIdCommand } from '@fancy-crud/core'

const bus = new Bus()

const title = ref('Modo root')

const form = useForm({
  fields: () => ({
    name: {
      type: FieldType.text,
      label: title.value,
      placeholder: 'Como asi pues?',
      hintText: 'Display some message',
      modelValue: title.value,
      // rules: value => ({ value, rule: string([email()]) }),
      wrapper: {
        class: 'col-span-6',
      },
    },
    gender: {
      type: '',
      modelValue: 'm',
    },
  }),
  settings: () => ({
    url: 'artists/',
    title: title.value,
  }),
  buttons: () => ({
    main: {
      label: title.value,
      loading: false,
    },
    aux: {
      onClick: () => {
        bus.execute(
          new ResetFieldsByFormIdCommand(form.id),
        )
      },
    },
  }),
})
</script>

