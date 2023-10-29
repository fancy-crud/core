<template>
  <ow-field v-bind="props.field.wrapper" :label="props.field.label" :variant="variant" :message="hintText">
    <div :class="display">
      <template v-for="([label, value], _index) in options" :key="_index">
        <o-radio v-bind="props.field" v-model="modelValue" :name="nameIdentifier" :native-value="value">
          {{ label }}
        </o-radio>
      </template>
    </div>
  </ow-field>
</template>

<script lang="ts" setup>
import { ORadio } from '@oruga-ui/oruga-next'
import { useRadioField } from '@fancy-crud/vue'
import type { NormalizedRadioField } from '@fancy-crud/vue'
import OwField from './OwField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedRadioField
}>()

const nameIdentifier = Symbol(props.field.modelKey).toString()

const { modelValue, hasFieldErrors, hintText, inRowDisplay, options } = useRadioField(props)

const display = computed(() => inRowDisplay.value ? inRowDisplay.value : 'radio-group--cascade')

const variant = computed(() => hasFieldErrors.value ? 'danger' : '')
</script>
