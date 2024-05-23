<template>
  <div class="bg-white rounded-xl p-4">
    <f-form v-bind="form">
      <template #form-footer="bind">
        <f-form-footer v-bind="bind" />
      </template>
    </f-form>
  </div>
</template>

<script lang='ts' setup>
// import { email, string } from 'valibot'
import { FFormFooter, FieldType, useForm } from '@fancy-crud/vue'
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
      // rules: value => ({ value, rule: string([email()]) }),
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
      // wrapper: {
      //   class: 'col-span-6',
      // },
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

