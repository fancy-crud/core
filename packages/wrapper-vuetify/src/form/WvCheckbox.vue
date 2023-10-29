<template>
  <wv-field v-bind="props.field.wrapper" :error-messages="props.field.errors" :hint="hintText" :rules="undefined" :id="props.field.id">
    <div :class="inRowDisplay">
      <template v-for="([label, value], _index) in options" :key="_index">
        <v-checkbox v-model="modelValue" v-bind="getCheckboxAttributes(value)" :label="getLabel(label)">
          <slot />
        </v-checkbox>
      </template>
    </div>
  </wv-field>
</template>

<script lang="ts" setup>
import { VCheckbox } from 'vuetify/components'
import type { NormalizedCheckboxField } from '@fancy-crud/vue'
import { useCheckboxField } from '@fancy-crud/vue'

import WvField from './WvField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedCheckboxField
}>()

const { modelValue, hintText, inRowDisplay, options } = useCheckboxField(props)

function getLabel(label: unknown): string {
  return String(label)
}

function getCheckboxAttributes(value: unknown) {
  let attributes: Record<string, unknown> = {}

  if (props.field.multiple) {
    attributes = {
      value,
      ...props.field,
    }
  }
  else {
    attributes = {
      trueValue: value,
      falseValue: null,
      ...props.field,
    }
  }

  const { id, label, ...attrs } = attributes

  return attrs
}
</script>
