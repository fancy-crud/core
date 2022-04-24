<template>
  <main
    class="px-4 grid grid-cols-12"
    v-bind="$attrs"
  >
    <template
      v-for="(field, fieldKey) in form.fields"
      :key="fieldKey"
    >
      <slot :name="`before-${fieldKey}`" />
      <component
        :is="getComponent(field)"
        v-bind="{ field }"
      />
      <slot :name="`after-${fieldKey}`" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import type { Form, NormalizedFieldStructure } from '@/types'
import FInput from '@/components/form/FInput.vue'
import FInputDate from '@/components/form/FInputDate.vue'
import FCheckbox from '@/components/form/FCheckbox.vue'
import FInputPassword from '@/components/form/FInputPassword.vue'
import FSelect from '@/components/form/FSelect.vue'
import FRadio from '@/components/form/FRadio.vue'
import FColor from '@/components/form/FColor.vue'
import FTextarea from '@/components/form/FTextarea.vue'
import FInputFile from '@/components/form/FInputFile.vue'

const props = defineProps<{
  form: Form
}>()

const controls = {
  text: FInput,
  date: FInputDate,
  password: FInputPassword,
  select: FSelect,
  checkbox: FCheckbox,
  radio: FRadio,
  color: FColor,
  textarea: FTextarea,
  file: FInputFile,
  image: FInputFile,
}

const getComponent = (field: NormalizedFieldStructure) => {
  return controls[field.type] || controls.text
}

</script>
