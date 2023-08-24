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
import type { FormMode, NormalizedField, NormalizedSettings, ObjectWithNormalizedFields } from '@fancy-crud/core'
import { Bus, FilterFieldsByFormModeCommand, GetForeignKeyValuesCommand, fields as controls } from '@fancy-crud/core'

const props = defineProps<{
  formId: symbol
  fields: ObjectWithNormalizedFields
  settings: NormalizedSettings
}>()

const bus = new Bus()

const computedFields = computed(() => filterFields(props.fields, props.settings.mode))

onMounted(() => {
  const fields = Object.fromEntries(filterFields(props.fields, props.settings.mode))
  const getForeignKeyValuesCommand = new GetForeignKeyValuesCommand(fields)

  bus.execute(getForeignKeyValuesCommand)
})

function getComponent(field: NormalizedField) {
  type ControlType = keyof typeof controls
  return controls[field.type as ControlType] || controls.text
}

function filterFields(fields: ObjectWithNormalizedFields, mode: FormMode): [string, NormalizedField][] {
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