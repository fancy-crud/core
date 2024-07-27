<template>
  <q-file v-bind="computedAttrs" v-model="modelValue" outlined>
    <template #prepend>
      <q-icon name="attach_file" />
    </template>
    <template #after>
      <div v-if="props.field.preview" class="-translate-y-1/2">
        <f-file-reveal :form-id="props.formId" :field="props.field" />
      </div>
    </template>
  </q-file>
</template>

<script lang="ts" setup>
import { QFile, QIcon } from 'quasar'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { FFileReveal, useFileField,  } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const { modelValue, hintText, hasFieldErrors } = useFileField(props)

const computedAttrs = computed(() => {
  const { rules: _rules, ...field } = props.field
  return {
    ...props.field.wrapper,
    ...field,
    errorMessage: hintText.value,
    error: hasFieldErrors.value,
    hint: hintText.value,
  } as any
})
</script>
