<template>
  <v-file-input
    v-bind="{ ...props.field.wrapper, ...props.field, ...vmodel }"
    :label="props.field.label"
    :hint="props.field.hintText"
    :error-messages="props.field.errors"
  >
    <f-file-list @remove="removeFile" :items="filesList" />
  </v-file-input>
</template>

<script lang="ts" setup>
import { VFileInput } from 'vuetify/components'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { FFileList, useFileField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const { vmodel, filesList } = useFileField(props)

function removeFile(file: File) {
  if (!vmodel.value.modelValue)
    return

  if (Array.isArray(vmodel.value.modelValue)) {
    vmodel.value['onUpdate:modelValue'](vmodel.value.modelValue.filter(f => f.name !== file.name))
    return
  }

  vmodel.value['onUpdate:modelValue'](null)
}
</script>
