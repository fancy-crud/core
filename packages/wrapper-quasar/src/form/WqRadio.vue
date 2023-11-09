<template>
  <wq-field v-bind="props.field.wrapper" :label="props.field.label" :hint="hintText" :error-messages="props.field.errors" borderless>
    <q-option-group v-model="modelValue" v-bind="getAttributes()" :options="computedOptions">
      <slot />
    </q-option-group>
  </wq-field>
</template>

<script lang="ts" setup>
import { QOptionGroup } from 'quasar'
import { useRadioField } from '@fancy-crud/vue'
import type { NormalizedRadioField } from '@fancy-crud/vue'
import WqField from './WqField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedRadioField
}>()

const { modelValue, hintText, options } = useRadioField(props)

const computedOptions = computed(() => options.value.map(([label, value]) => ({ label, value })))

function getAttributes() {
  const { modelValue, inRow, wrapper, ...attrs } = props.field
  return attrs as any
}
</script>
