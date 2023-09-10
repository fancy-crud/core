<template>
  <div v-if="displayList" class="f-file-list">
    <div v-for="(file, index) in props.items" :key="index" class="f-file-list__wrapper">
      <div class="f-file-list__wrapper__item">
        <a @click="previewFile(file)" class="f-file-list__chip">
          <div v-if="isImage(file)" class="f-file-list__chip__preview__icon-wrapper">
            <i class="mdi mdi-eye" />
          </div>
          <span class="truncate">
            {{ file.name }}
          </span>
        </a>
        <f-button @click="emit('remove', file)" icon="close-circle" class="text-gray-500 hover:text-gray-600 ease-in duration-200" borderless />
      </div>
    </div>
  </div>

  <f-modal v-model="preview.show">
    <img class="f-preview__image" :src="preview.url" alt="">
  </f-modal>
</template>

<script lang="ts" setup>
const props = defineProps<{
  items: File[]
}>()

const emit = defineEmits<{
  (e: 'remove', file: File): void
}>()

const preview = reactive({
  show: false,
  url: '',
})

const list = computed(() => props.items ?? [])
const displayList = computed(() => list.value.length)

function isImage(file: File) {
  return file.type.startsWith('image/')
}

function previewFile(file: File) {
  const reader = new FileReader()

  // listen for 'load' events on the FileReader
  reader.addEventListener('load', () => {
    preview.url = reader.result?.toString() ?? ''
    preview.show = true
  }, false)

  if (file && isImage(file))
    reader.readAsDataURL(file)
}
</script>

<style lang="sass" scoped>
.f-file-list
  @apply w-full pt-6 flex flex-wrap

.f-file-list__wrapper
  @apply pr-4 py-2
.f-file-list__wrapper__item
  @apply flex items-center py-1 pl-5 rounded-full bg-gray-300 hover:bg-gray-400/60 ease-in duration-300

.f-file-list__chip
  @apply cursor-pointer h-full flex items-center
  max-width: 10rem

.f-file-list__chip__preview__icon-wrapper
  @apply pr-2 text-gray-500

.f-preview__image
  max-width: 100%
  max-height: 100%
</style>
