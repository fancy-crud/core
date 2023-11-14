<template>
  <we-field v-if="props.field.multiple" v-bind="props.field.wrapper" :error-messages="props.field.errors" :hint="hintText" :rules="undefined" :id="props.field.id">
    <el-checkbox-group v-model="modelValue">
      <template v-for="([label, value], _index) in computedOptions" :key="_index">
        <el-checkbox v-bind="getCheckboxAttributes(value)" :label="value">
          {{ getLabel(label) }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </we-field>

  <we-field v-else v-bind="props.field.wrapper" :error-messages="props.field.errors" :hint="hintText" :rules="undefined" :id="props.field.id">
    <div :class="inRowDisplay">
      <template v-for="([label, value], _index) in computedOptions" :key="_index">
        <el-checkbox v-model="modelValue" v-bind="getCheckboxAttributes(value)" :label="value">
          {{ getLabel(label) }}
        </el-checkbox>
      </template>
    </div>
  </we-field>
</template>

<script lang="ts" setup>
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import type { NormalizedCheckboxField } from '@fancy-crud/vue'
import { useCheckboxField } from '@fancy-crud/vue'

import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedCheckboxField
}>()

const { modelValue, hintText, inRowDisplay, options } = useCheckboxField<any>(props)

const computedOptions = computed(() => options.value as any[][])

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

  const { id, label, modelValue, ...attrs } = attributes

  return attrs
}
</script>
