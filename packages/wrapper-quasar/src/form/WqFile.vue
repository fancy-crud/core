<template>
  <!-- <v-file-input
    v-bind="computedAttrs"
    :label="props.field.label"
    :hint="props.field.hintText"
    :error-messages="props.field.errors"
  >
    <f-file-list @remove="removeFile" :items="filesList" />
  </v-file-input> -->

  <q-file v-bind="computedAttrs" v-model="modelValue" outlined>
    <template #prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script lang="ts" setup>
import { QFile, QIcon } from 'quasar'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { useFileField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const { modelValue } = useFileField(props)

const computedAttrs = computed(() => {
  return {
    ...props.field.wrapper, ...props.field,
  } as any
})

// function removeFile(file: File) {
//   if (!vmodel.value.modelValue)
//     return

//   if (Array.isArray(vmodel.value.modelValue)) {
//     vmodel.value['onUpdate:modelValue'](vmodel.value.modelValue.filter(f => f.name !== file.name))
//     return
//   }

//   vmodel.value['onUpdate:modelValue'](null)
// }
</script>
