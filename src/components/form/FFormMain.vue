<template>
  <main
    class="px-4"
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
import FInput from '@/components/FInput.vue'
import FInputDate from '@/components/FInputDate.vue'
import FCheckbox from '@/components/FCheckbox.vue'
import FInputPassword from '@/components/FInputPassword.vue'
import FSelect from '@/components/FSelect.vue'
import FRadio from '@/components/FRadio.vue'
import FColor from '@/components/FColor.vue'
import FTextarea from '@/components/FTextarea.vue'
import FInputFile from '@/components/FInputFile.vue'

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
