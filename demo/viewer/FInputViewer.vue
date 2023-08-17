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
import { Bus, ResetFieldsByFormIdCommand } from '@fancy-crud/core'
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
}

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'Como asi pues?',
      rules: (value: string) => ({ value, rule: z.string().min(1).max(5).nullable() }),
      wrapper: {
        class: 'col-span-6',
      },
    },
    gender: {
      type: FieldType.select,
      label: 'Last name',
      class: 'w-full',
      optionLabel: 'label',
      optionValue: 'value',
      options: [
        { label: 'Male', value: 'm' },
        { label: 'Female', value: 'f' },
      ],
      wrapper: {
        class: 'col-span-6',
      },
    },
  },
  settings,
})

function resetFields() {
  bus.execute(
    new ResetFieldsByFormIdCommand(form.id),
  )
}
</script>

