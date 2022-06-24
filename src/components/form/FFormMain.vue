<template>
  <main
    class="px-4 grid grid-cols-12 gap-x-8"
    v-bind="$attrs"
  >
    <template
      v-for="([fieldKey, field]) in fields"
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
import { computed, onMounted } from 'vue'
import type { Form, NormalizedFieldStructure } from '@/types'
import { FormModes } from '@/types'
import FInput from '@/components/inputs/FInput/FInput.vue'
import FInputDate from '@/components/inputs/FInputDate/FInputDate.vue'
import FCheckbox from '@/components/inputs/FCheckbox/FCheckbox.vue'
import FInputPassword from '@/components/inputs/FInputPassword/FInputPassword.vue'
import FSelect from '@/components/inputs/FSelect/FSelect.vue'
import FRadio from '@/components/inputs/FRadio/FRadio.vue'
import FColor from '@/components/inputs/FColor/FColor.vue'
import FTextarea from '@/components/inputs/FTextarea/FTextarea.vue'
import FInputFile from '@/components/inputs/FInputFile/FInputFile.vue'
import { getForeignKeys } from '@/composables'

const props = defineProps<{
  form: Form
}>()

const controls = {
  text: FInput,
  date: FInputDate,
  password: FInputPassword,
  select: FSelect,
  autocomplete: FSelect,
  checkbox: FCheckbox,
  radio: FRadio,
  color: FColor,
  textarea: FTextarea,
  file: FInputFile,
  image: FInputFile,
}

const getComponent = (field: NormalizedFieldStructure) => {
  type ControlType = keyof typeof controls
  return controls[field.type as ControlType] || controls.text
}

const fields = computed(() => {
  const _fields = Object.entries(props.form.fields).filter(([_, field]) => {
    if (field.hidden)
      return false

    if (field.createOnly && props.form.settings.mode !== FormModes.CREATE_MODE)
      return false

    if (field.updateOnly && props.form.settings.mode === FormModes.CREATE_MODE)
      return false

    return true
  })

  return _fields
})

onMounted(() => getForeignKeys(props.form.fields))
</script>
