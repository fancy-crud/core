<template>
  <f-form v-bind="form" disable-notifications />

  <p class="py-8">
    {{ form.fields.name.modelValue }}
  </p>

  <button @click="form.manager.resetFields" class="px-8 py-4 bg-primary-500 text-white font-bold">
    Reset
  </button>

  <!-- <button @click="form.fillValues" class="px-8 py-4 bg-primary-500 text-white font-bold ml-4">
    Fill
  </button> -->
</template>

<script lang='ts' setup>
import { z } from 'zod'
import { FieldType } from '@fancy-crud/core'
// import { NotificationType, useForm } from '@/forms/integration'

// const { rules } = useRules()

const settings = {
  url: 'artists/',
}

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'Como asi pues?',
      rules: (value: string) => ({ value, rule: z.string().min(1).max(5) }),
      wrapper: {
        class: 'col-span-10',
      },
    },
    // gender: {
    //   type: FieldType.select,
    //   label: 'Last name',
    //   class: 'w-full',
    //   optionLabel: 'label',
    //   optionValue: 'value',
    //   options: [
    //     { label: 'Male', value: 'm' },
    //     { label: 'Female', value: 'f' },
    //   ],
    // },
  },
  settings,
})
</script>

