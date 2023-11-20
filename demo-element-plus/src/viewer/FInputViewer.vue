<template>
  <div class="bg-white rounded-xl p-4">
    <f-form v-bind="form">
      <template #field-name="bind">
        <f-text :form-id="form.id" :field="form.fields.name">
          <template #prepend>
            Http://
          </template>
        </f-text>
      </template>
    </f-form>
  </div>
</template>

<script lang='ts' setup>
import { email, string } from 'valibot'
import { FText, FieldType, useForm } from '@fancy-crud/vue'
import { Bus, FORM_MODE, ResetFieldsByFormIdCommand } from '@fancy-crud/core'

const bus = new Bus()
const settings = {
  url: 'artists/',
  mode: FORM_MODE.update,
  title: 'Modo root',
}

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'Como asi pues?',
      hintText: 'Display some message',
      rules: value => ({ value, rule: string([email()]) }),
      wrapper: {
        class: 'col-span-6',
      },
    },

    password: {
      type: FieldType.text,
      label: 'Last name',
      class: 'w-full',
      wrapper: {
        class: 'col-span-6',
      },
    },

    email: {
      type: FieldType.text,
      label: 'Email',
      class: 'w-full',
      wrapper: {
        class: 'col-span-6',
      },
    },
  },
  settings,
  buttons: {
    main: {
      label: '{{ Lanzar | Modificar }}',
    },
    aux: {
      onClick: () => {
        bus.execute(
          new ResetFieldsByFormIdCommand(form.id),
        )
      },
    },
  },
})
</script>

