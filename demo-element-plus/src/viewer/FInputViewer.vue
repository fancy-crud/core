<template>
  <div class="bg-white rounded-xl p-4">
    <f-form @success="printing" @error="printing" v-bind="form" class="el-form--label-top" />
  </div>
  <input v-model="title">
</template>

<script lang='ts' setup>
import { FieldType, useForm } from '@fancy-crud/vue'
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

// function loadData(e: any) {
//   bus.execute(
//     new LoadRemoteRecordCommand(form.id, '9', {
//       onInit() {
//         form.buttons.main.loading = true
//       },
//       onFinally() {
//         form.buttons.main.loading = false
//       },
//     }),
//   )
// }

function printing(response: any) { console.log(response) }
</script>

