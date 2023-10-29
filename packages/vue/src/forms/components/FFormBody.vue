<template>
  <main
    class="f-form__body"
    v-bind="$attrs"
  >
    <template
      v-for="([fieldKey, field]) in computedFields"
      :key="fieldKey"
    >
      <slot :name="`before-field-${fieldKey}`" v-bind="{ field }" />
      <slot :name="`field-${fieldKey}`" v-bind="{ field }">
        <component
          :is="getComponent(field)"
          v-bind="{ formId: props.formId, field, class: 'f-form__body__field col-span-12' }"
        />
      </slot>
      <slot :name="`before-field-after-${fieldKey}`" v-bind="{ field }" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import type { BaseObjectWithNormalizedFields, FormMode, NormalizedField, NormalizedSettings } from '@fancy-crud/core'
import { Bus, FilterFieldsByFormModeCommand, GetForeignKeyValuesCommand, components } from '@fancy-crud/core'

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
  ...components,
}

onMounted(() => {
  const fields = Object.fromEntries(filterFields(props.fields, props.settings.mode))
  const getForeignKeyValuesCommand = new GetForeignKeyValuesCommand(fields)

  bus.execute(getForeignKeyValuesCommand)
})

function getComponent(field: NormalizedField) {
  type ControlType = keyof typeof defaultControls

  const control = defaultControls[field.type]

  return control ?? (defaultControls[field.type as ControlType] ?? defaultControls.text)
}

function filterFields(fields: BaseObjectWithNormalizedFields, mode: FormMode): [string, NormalizedField][] {
  const filteredFields = bus.execute(
    new FilterFieldsByFormModeCommand(fields, mode),
  ) as [string, NormalizedField][]

  return filteredFields
}
</script>
