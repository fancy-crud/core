<template>
  <we-field v-bind="computedAttrs" :label="props.field.label" :message="hintText" :has-field-errors="hasFieldErrors">
    <el-input v-bind="props.field" v-model="modelValue" type="textarea">
      <template
        v-for="([slotName]) in computedSlotNames"
        #[`${slotName}`]
        :key="slotName"
      >
        <slot :name="slotName" />
      </template>
    </el-input>
  </we-field>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
import type { NormalizedTextField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedTextField
}>()

const slots = useSlots()
const attrs = useAttrs()

const { hintText, modelValue, hasFieldErrors } = useTextField<any>(props)

const computedAttrs = computed(() => {
  return {
    ...attrs,
    ...props.field.wrapper,
  }
})

const computedSlotNames = computed(() => {
  return Object.entries(slots)
})
</script>

