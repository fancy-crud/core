<template>
  <div>
    <q-select
      v-bind="{ ...props.field.wrapper, ...props.field, ...$attrs, ...attrs, rules: undefined }"
      v-model="modelValue"
      :error-message="hintText"
      :error="hasFieldErrors"
    >
      <template
        v-for="([slotName]) in computedSlotNames"
        #[`${slotName}`]
        :key="slotName"
      >
        <slot :name="slotName" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts" setup>
import { QSelect } from 'quasar'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import { useSelectField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedSelectField
}>()

const slots = useSlots()
const { modelValue, hintText, attrs, hasFieldErrors } = useSelectField<any>(props)

const computedSlotNames = computed(() => {
  return Object.entries(slots)
})
</script>

