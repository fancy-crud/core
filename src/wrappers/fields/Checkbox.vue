<template>
  <o-field v-bind="props.field.wrapper" :label="props.field.label" :variant="variant" :message="hintText">
    <div :class="inRowDisplay">
      <template v-for="([label, value], _index) in options" :key="_index">
        <o-checkbox v-model="modelValue" v-bind="getCheckboxAttributes(value)" :name="nameIdentifier">
          <slot>{{ label }}</slot>
        </o-checkbox>
      </template>
    </div>
  </o-field>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import { OCheckbox } from '@oruga-ui/oruga-next'
import type { NormalizedCheckboxField } from '@fancy-crud/core'
import { useCheckboxField } from '@/forms/integration'

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
    }
  }
  else {
    attributes = {
      trueValue: value,
      falseValue: null,
    }
  }

  return attributes
}
</script>
