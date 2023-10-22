<template>
  <main
    class="f-form-body"
    v-bind="$attrs"
  >
    <template
      v-for="([fieldKey, field]) in computedFields"
      :key="fieldKey"
    >
      <slot :name="`before-${fieldKey}`" />
      <component
        :is="getComponent(field)"
        v-bind="{ formId: props.formId, field }"
      />
      <slot :name="`after-${fieldKey}`" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import type { BaseObjectWithNormalizedFields, FormMode, NormalizedField, NormalizedSettings } from '@fancy-crud/core'
import { Bus, FilterFieldsByFormModeCommand, GetForeignKeyValuesCommand, fields as controls } from '@fancy-crud/core'

import FCheckbox from './FCheckbox.vue'
import FPassword from './FPassword.vue'
import FColor from './FColor.vue'
import FSelect from './FSelect.vue'
import FRadio from './FRadio.vue'
import FFile from './FFile.vue'
import FDatepicker from './FDatepicker.vue'
import FText from './FText.vue'

const props = defineProps<{
  formId: symbol
  fields: BaseObjectWithNormalizedFields
  settings: NormalizedSettings
}>()

const bus = new Bus()

const computedFields = computed(() => filterFields(props.fields, props.settings.mode))

const defaultControls: Record<string, any> = {
  checkbox: FCheckbox,
  password: FPassword,
  color: FColor,
  select: FSelect,
  radio: FRadio,
  file: FFile,
  datepicker: FDatepicker,
  text: FText,
}

onMounted(() => {
  const fields = Object.fromEntries(filterFields(props.fields, props.settings.mode))
  const getForeignKeyValuesCommand = new GetForeignKeyValuesCommand(fields)

  bus.execute(getForeignKeyValuesCommand)
})

function getComponent(field: NormalizedField) {
  type ControlType = keyof typeof controls

  const control = defaultControls[field.type]

  return control ?? (controls[field.type as ControlType] ?? controls.text)
}

function filterFields(fields: BaseObjectWithNormalizedFields, mode: FormMode): [string, NormalizedField][] {
  const filteredFields = bus.execute(
    new FilterFieldsByFormModeCommand(fields, mode),
  ) as [string, NormalizedField][]

  return filteredFields
}
</script>

<style lang="sass">
.f-form-body
  @apply grid grid-cols-12 gap-x-8 gap-y-4
</style>
