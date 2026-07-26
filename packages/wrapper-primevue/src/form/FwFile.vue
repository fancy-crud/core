<template>
  <fw-field
    :label="props.field.label"
    :message="hintText"
    :has-field-errors="hasFieldErrors"
    v-bind="props.field.wrapper"
  >
    <FileUpload
      :multiple="props.field.multiple"
      :auto="false"
      :showUploadButton="false"
      :showCancelButton="false"
      @select="onFilesSelected"
      @remove="onFileRemoved"
      @clear="onFilesClear"
    >
      <template #empty>
        <p>{{ props.field.placeholder || 'Drag and drop files here to upload.' }}</p>
      </template>
    </FileUpload>
  </fw-field>
</template>

<script lang="ts" setup>
import FileUpload from 'primevue/fileupload'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { useFileField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

interface FileUploadSelectEvent {
  originalEvent: Event
  files: File[]
}

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const { onFileChanged, hasFieldErrors, hintText } = useFileField(props)

/**
 * Extracts native File objects from PrimeVue's file array.
 * PrimeVue adds extra properties like objectURL that cause issues when sending to backend.
 */
function extractNativeFiles(files: File[]): File[] {
  return files.map(file => {
    // Create a new clean File object without PrimeVue's extra properties
    return new File([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    })
  })
}

function onFilesSelected(event: FileUploadSelectEvent) {
  const nativeFiles = extractNativeFiles(event.files)
  
  const syntheticEvent = {
    target: {
      files: nativeFiles,
    },
  } as unknown as Event

  onFileChanged(syntheticEvent)
}

function onFileRemoved(event: { file: File }) {
  // When a file is removed, we need to update with remaining files
  // PrimeVue handles the UI, we just need to sync the model
  // The @select event will fire again with updated files list
}

function onFilesClear() {
  const syntheticEvent = {
    target: {
      files: [],
    },
  } as unknown as Event

  onFileChanged(syntheticEvent)
}
</script>
