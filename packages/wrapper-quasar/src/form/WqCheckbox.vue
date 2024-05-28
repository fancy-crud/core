<template>
  <wq-field v-bind="props.field.wrapper" borderless :error-message="hintText" :error="hasFieldErrors" :hint="hintText" :rules="undefined" :id="props.field.id">
    <div :class="inRowDisplay">
      <template v-for="([label, value], _index) in options" :key="_index">
        <q-checkbox v-model="modelValue" v-bind="getCheckboxAttributes(value)" :label="getLabel(label)">
          <slot />
        </q-checkbox>
      </template>
    </div>
  </wq-field>
</template>

<script lang="ts" setup>
import { QCheckbox } from 'quasar'
import type { NormalizedCheckboxField } from '@fancy-crud/vue'
import { useCheckboxField } from '@fancy-crud/vue'

import WqField from './WqField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedCheckboxField
}>()

const { modelValue, hintText, inRowDisplay, options, hasFieldErrors, isABooleanCheckbox } = useCheckboxField(props)

function getLabel(label: unknown): string {
  return String(label)
}

function getCheckboxAttributes(value: unknown) {
  let attributes: Record<string, unknown> = {}

  if (!isABooleanCheckbox) {
    attributes = {
      val: value,
      ...props.field,
    }
  }
  else {
    attributes = {
      trueValue: value,
      falseValue: false,
      ...props.field,
    }
  }

  const { id, label, ...attrs } = attributes

  return attrs
}
</script>

