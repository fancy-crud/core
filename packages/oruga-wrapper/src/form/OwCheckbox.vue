<template>
  <ow-field v-bind="props.field.wrapper" :label="props.field.label" :variant="variant" :message="hintText">
    <div :class="inRowDisplay">
      <template v-for="([label, value], _index) in options" :key="_index">
        <o-checkbox v-model="modelValue" v-bind="getCheckboxAttributes(value)" :name="nameIdentifier">
          <slot>{{ label }}</slot>
        </o-checkbox>
      </template>
    </div>
  </ow-field>
</template>

<script lang="ts" setup>
import { OCheckbox } from '@oruga-ui/oruga-next'
import type { NormalizedCheckboxField } from '@fancy-crud/vue'
import { useCheckboxField } from '@fancy-crud/vue'

import WoField from './OwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedCheckboxField
}>()

const { modelValue, hasFieldErrors, hintText, inRowDisplay, options } = useCheckboxField(props)

const nameIdentifier = Symbol(props.field.modelKey).toString()

const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

function getCheckboxAttributes(value: unknown) {
  let attributes: Record<string, unknown> = {}

  if (props.field.multiple) {
    attributes = {
      nativeValue: value,
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

  return attributes
}
</script>
