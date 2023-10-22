<template>
  <input v-model="form.fields.name.modelValue" type="text">

  <f-form v-bind="form" />
  <p class="py-8">
    {{ form.fields.name.modelValue }}
  </p>

  <button @click="resetFields" class="px-8 py-4 bg-primary-500 text-white font-bold">
    Reset
  </button>

  <!-- <button @click="form.fillValues" class="px-8 py-4 bg-primary-500 text-white font-bold ml-4">
    Fill
  </button> -->
</template>

<script lang='ts' setup>
import { z } from 'zod'
import { FieldType, useForm } from '@fancy-crud/vue'
import { Bus, FORM_MODE, ResetFieldsByFormIdCommand } from '@fancy-crud/core'
// import { NotificationType, useForm } from '@/forms/integration'

// const { rules } = useRules()
// setFancyCrudConfig({
//   http: {
//     service: axios,
//   },
//   fields,
//   utils,
//   table,
//   defaultClasses,
//   ruleOptions: {
//     processResult: (raw: { value: unknown; rule: ZodAny }) => {
//       const { value, rule } = raw
//       const result = rule.safeParse(value)

//       if (result.success)
//         return result.success

//       return result.error.issues[0].message
//     },
//   },
// })

const bus = new Bus()
const settings = {
  url: 'artists/',
  mode: FORM_MODE.update,
}

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'Como asi pues?',
      rules: value => ({ value, rule: z.string().min(1).max(3) }),
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

    third: {
      type: FieldType.text,
      label: 'Last name',
      class: 'w-full bg-blue-300',
      wrapper: {
        class: 'col-span-3 bg-blue-500',
      },
    },
  },
  settings,
  buttons: {
    main: {
      label: {
        create: 'Lanzar',
        update: 'Modificar',
      },
    },
  },
})

function resetFields() {
  bus.execute(
    new ResetFieldsByFormIdCommand(form.id),
  )
}
</script>

