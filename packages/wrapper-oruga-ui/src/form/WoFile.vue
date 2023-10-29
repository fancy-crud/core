<template>
  <wo-field
    v-bind="{ ...props.field.wrapper }"
    :label="props.field.label"
    :variant="variant"
    :message="hintText"
    grouped
  >
    <o-upload
      @update:modelValue="vmodel['onUpdate:modelValue']"
      :modelValue="vmodel.modelValue"
      :multiple="props.field.multiple"
    >
      <f-button v-bind="{ ...defaults.mainButton, ...props.field }" icon="upload" tag="a" class="text-primary-500 border-primary-500 hover:bg-primary-500 ease-in duration-300">
        <span>{{ props.field.placeholder }}</span>
      </f-button>
    </o-upload>

    <f-file-list @remove="removeFile" :items="filesList" />
  </wo-field>
</template>

<script lang="ts" setup>
import { OUpload } from '@oruga-ui/oruga-next'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { FButton, FFileList, useFileField } from '@fancy-crud/vue'
import { getDefaults } from '@fancy-crud/core'
import WoField from './WoField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const defaults = getDefaults()

const { vmodel, hasFieldErrors, hintText, filesList } = useFileField(props)
const variant = computed(() => (hasFieldErrors.value ? 'danger' : ''))

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

<style lang="sass" scoped>
.placeholder
  @apply pl-3

:deep(.o-field)
  flex-flow: row wrap
</style>
