<template>
  <div class="bg-white rounded-xl p-4">
    <f-form v-bind="form" />
  </div>
</template>

<script lang='ts' setup>
import { email, string } from 'valibot'
import { FieldType, useForm } from '@fancy-crud/vue'
import { Bus, FORM_MODE, INotificationStore, ResetFieldsByFormIdCommand, injecting } from '@fancy-crud/core'

const bus = new Bus()
const settings = {
  url: 'artists/',
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

    gender: {
      type: FieldType.text,
      modelValue: 'm',
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
      hidden: true,
    },
    aux: {
      // hidden: true,
      class: 'ml-0',
      onClick: () => {
        bus.execute(
          new ResetFieldsByFormIdCommand(form.id),
        )
      },
    },
  },
})

onMounted(() => {
  const notify: INotificationStore = injecting(INotificationStore)
  notify.push({ notification: { message: 'Hola mundo', type: 'success' } })
})
</script>

