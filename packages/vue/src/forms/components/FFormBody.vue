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
          :is="field.getComponent()"
          v-bind="binding(field)"
        />
      </slot>
      <slot :name="`after-field-${fieldKey}`" v-bind="{ field }" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import type { BaseObjectWithNormalizedFields, FormMode, NormalizedField, NormalizedSettings } from '@fancy-crud/core'
import { Bus, FilterFieldsByFormModeCommand, GetForeignKeyValuesCommand } from '@fancy-crud/core'

const props = defineProps<{
  formId: symbol
  fields: BaseObjectWithNormalizedFields
  settings: NormalizedSettings
}>()

const bus = new Bus()

const computedFields = computed(() => filterFields(props.fields, props.settings.mode).filter(
  ([_, field]) => field.hidden !== true),
)

onMounted(() => {
  const fields = Object.fromEntries(
    filterFields(props.fields, props.settings.mode),
  )
  bus.execute(
    new GetForeignKeyValuesCommand(fields),
  )
})

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
