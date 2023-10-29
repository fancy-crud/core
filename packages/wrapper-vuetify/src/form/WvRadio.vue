<template>
  <wv-field v-bind="props.field.wrapper" :label="props.field.label" :hint="hintText" :error-messages="props.field.errors">
    <v-radio-group v-model="modelValue" v-bind="getAttributes()">
      <template v-for="([label, value], _index) in options" :key="_index">
        <v-radio :label="getLabel(label)" :value="value">
          <slot />
        </v-radio>
      </template>
    </v-radio-group>
  </wv-field>
</template>

<script lang="ts" setup>
import { VRadio, VRadioGroup } from 'vuetify/components'
import { useRadioField } from '@fancy-crud/vue'
import type { NormalizedRadioField } from '@fancy-crud/vue'
import WvField from './WvField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedRadioField
}>()

const { modelValue, hintText, options } = useRadioField(props)

// const display = computed(() => inRowDisplay.value ? inRowDisplay.value : 'radio-group--cascade')

function getAttributes() {
  const { modelValue, inRow, wrapper, ...attrs } = props.field
  return attrs as any
}

function getLabel(label: unknown): string {
  return String(label)
}
</script>
