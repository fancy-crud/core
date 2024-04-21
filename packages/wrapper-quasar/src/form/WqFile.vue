<template>
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
</script>
