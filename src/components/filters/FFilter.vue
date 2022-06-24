<template>
  <main
    class="grid grid-cols-12 gap-x-8"
    v-bind="$attrs"
  >
    <template
      v-for="([fieldKey, field]) in filters"
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
import type { NormalizedFieldStructure, NormalizedFields } from '@/types'

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
  filters: NormalizedFields
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

const filters = computed(() => {
  const _filters = Object.entries(props.filters).filter(([_, filter]) => {
    if (filter.hidden)
      return false

    return true
  })

  return _filters
})

onMounted(() => {
  getForeignKeys(props.filters)
})
</script>
