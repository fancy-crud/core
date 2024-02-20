<template>
  <div class="bg-white rounded-xl p-4">
    <f-form @success="printing" @error="printing" v-bind="form" />
  </div>

  <button @click="loadData">
    Load data
  </button>
</template>

<script lang='ts' setup>
// import { email, string } from 'valibot'
import { FieldType, useForm } from '@fancy-crud/vue'
import { Bus, LoadRemoteRecordCommand, ResetFieldsByFormIdCommand } from '@fancy-crud/core'

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
      hintText: 'Display some message',
      // rules: value => ({ value, rule: string([email()]) }),
      wrapper: {
        class: 'col-span-6',
      },
    },
    gender: {
      type: '',
      modelValue: 'm',
    },
  },
  settings,
  buttons: {
    main: {
      label: '{{ Lanzar | Modificar }}',
      loading: false,
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

function loadData(e: any) {
  bus.execute(
    new LoadRemoteRecordCommand(form.id, '9', {
      onInit() {
        form.buttons.main.loading = true
      },
      onFinally() {
        form.buttons.main.loading = false
      },
    }),
  )
}

function printing(response: any) { console.log(response) }
</script>

