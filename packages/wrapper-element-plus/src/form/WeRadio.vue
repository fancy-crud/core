<template>
  <we-field v-bind="props.field.wrapper" :label="props.field.label" :hint="hintText" :error-messages="props.field.errors">
    <el-radio-group v-model="modelValue" v-bind="getAttributes()">
      <template v-for="([label, value], _index) in computedOptions" :key="_index">
        <el-radio :label="value">
          {{ getLabel(label) }}
        </el-radio>
      </template>
    </el-radio-group>
  </we-field>
</template>

<script lang="ts" setup>
import { ElRadio, ElRadioGroup } from 'element-plus'
import { useRadioField } from '@fancy-crud/vue'
import type { NormalizedRadioField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedRadioField
}>()

const { modelValue, hintText, options } = useRadioField(props)

const computedOptions = computed(() => options.value as any[][])

function getAttributes() {
  const { modelValue, inRow, wrapper, ...attrs } = props.field
  return attrs as any
}

function getLabel(label: unknown): string {
  return String(label)
}
</script>
