<template>
  <main
    class="f-form-body"
    v-bind="$attrs"
  >
    <template
      v-for="([fieldKey, field]) in fields"
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
import type { NormalizedField, NormalizedSettings, ObjectWithNormalizedFields } from '@fancy-crud/core'
import { FormManagerHandler, FormModes, fields as controls } from '@fancy-crud/core'

const props = defineProps<{
  formId: symbol
  fields: ObjectWithNormalizedFields
  settings: NormalizedSettings
}>()

const formManager = new FormManagerHandler(props.formId)

const fields = computed(() => {
  const mode = props.settings.mode
  const filteredFields = Object.entries(props.fields).filter(([_, field]) => {
    const isHidden = field.hidden
    const isCreateOnly = field.createOnly && mode !== FormModes.CREATE_MODE
    const isUpdateOnly = field.updateOnly && mode === FormModes.CREATE_MODE

    if (isHidden || isCreateOnly || isUpdateOnly)
      return false

    return true
  })

  return filteredFields
})

onMounted(() => {
  formManager.getForeignKeyValues(Object.fromEntries(fields.value))
})

function getComponent(field: NormalizedField) {
  type ControlType = keyof typeof controls
  return controls[field.type as ControlType] || controls.text
}
</script>

<style lang="sass">
.f-form-body
  @apply grid grid-cols-12 gap-x-8 gap-y-4
</style>
