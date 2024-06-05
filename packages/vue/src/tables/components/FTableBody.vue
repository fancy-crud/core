<template>
  <component
    :is="components.tableBody"
    v-bind="$attrs"
    :headers="props.headers"
    :items="props.items"
    :buttons="props.buttons"
  >
    <template v-for="(_, slotName) in slots" #[`${slotName}`]="bind" :key="slotName">
      <slot :name="slotName" v-bind="bind" />
    </template>

    <template v-for="[columnName] in allowInputColumns" #[`column-${columnName}`]="{ row }" :key="columnName">
      <component :is="getComponent(row.$form.fields[columnName])" v-bind="binding(row, columnName)" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import type { NormalizedColumn, NormalizedField, NormalizedTableButtons } from '@fancy-crud/core'
import { ITableStore, components, injecting } from '@fancy-crud/core'

interface Row {
  $form: {
    id: symbol
    fields: Record<string, NormalizedField>
  }
}

const props = defineProps<{
  headers: NormalizedColumn[]
  items: any[]
  buttons: NormalizedTableButtons
}>()

const slots = useSlots()

const tableId: symbol = inject('tableId')!
const tableStore: ITableStore = injecting(ITableStore.name)!

const table = tableStore.searchById(tableId)!

const allowInputColumns = computed(() => {
  return Object
    .entries<NormalizedColumn>(table.columns)
    .filter(([_, column]) => column.input.isEnable)
})

function getComponent(field: NormalizedField) {
  type ControlType = keyof typeof components

  const control = components[field.type]
  return control ?? (components[field.type as ControlType] ?? components.text)
}

function binding(row: Row, fieldName: string) {
  return {
    formId: row.$form.id,
    field: row.$form.fields[fieldName],
    class: 'f-form__body__field col-span-12',
  }
}
</script>
