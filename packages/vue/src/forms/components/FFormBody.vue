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
      <slot :name="`field-${fieldKey}`" v-bind="binding(field)">
        <component
          :is="getComponent(field)"
          v-bind="binding(field)"
        />
      </slot>
      <slot :name="`after-field-${fieldKey}`" v-bind="{ field }" />
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

const computedFields = computed(() => filterFields(props.fields, props.settings.mode).filter(
  ([_, field]) => field.hidden !== true),
)

const defaultControls: Record<string, any> = {
  checkbox: FCheckbox,
  password: FPassword,
  color: FColor,
  select: FSelect,
  radio: FRadio,
  file: FFile,
  datepicker: FDatepicker,
  text: FText,
  image: FFile,
  ...components,
}

onMounted(() => {
  const fields = Object.fromEntries(
    filterFields(props.fields, props.settings.mode),
  )
  bus.execute(
    new GetForeignKeyValuesCommand(fields),
  )
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

function binding(field: NormalizedField) {
  return {
    formId: props.formId, field, class: 'f-form__body__field col-span-12',
  }
}
</script>
