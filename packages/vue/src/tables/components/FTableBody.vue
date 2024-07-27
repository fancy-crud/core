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

import FCheckbox from '@packages/vue/forms/components/FCheckbox.vue'
import FPassword from '@packages/vue/forms/components/FPassword.vue'
import FColor from '@packages/vue/forms/components/FColor.vue'
import FSelect from '@packages/vue/forms/components/FSelect.vue'
import FRadio from '@packages/vue/forms/components/FRadio.vue'
import FFile from '@packages/vue/forms/components/FFile.vue'
import FDatepicker from '@packages/vue/forms/components/FDatepicker.vue'
import FText from '@packages/vue/forms/components/FText.vue'
import FFileReveal from '@packages/vue/forms/components/FFileReveal.vue'

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
    filePreview: FFileReveal,
    ...components,
  }

  if (field.preview)
    return defaultControls.filePreview

  type ControlType = keyof typeof defaultControls

  const control = defaultControls[field.type]

  return control ?? (defaultControls[field.type as ControlType] ?? defaultControls.text)
}

function binding(row: Row, fieldName: string) {
  return {
    formId: row.$form.id,
    field: row.$form.fields[fieldName],
    class: 'f-form__body__field col-span-12',
  }
}
</script>
