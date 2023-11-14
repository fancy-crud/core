<template>
  <we-field
    :label="props.field.label"
    :hint="props.field.hintText"
    :error-messages="props.field.errors"
    v-bind="props.field.wrapper"
  >
    <el-upload
      v-model:file-list="modelValue"
      v-bind="computedAttrs"
      show-file-list
    >
      <el-button>
        {{ props.field.placeholder }}
      </el-button>
    </el-upload>
  </we-field>
</template>

<script lang="ts" setup>
import { ElUpload } from 'element-plus'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { useFileField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const { modelValue } = useFileField(props)

const computedAttrs = computed(() => {
  return {
    autoUpload: false, ...props.field,
  } as any
})
</script>
