<template>
  <div v-if="displayList" class="f-file-list">
    <div v-for="(file, index) in props.items" :key="index" class="f-file-list__wrapper">
      <div class="f-file-list__wrapper__item">
        <a @click="previewFile(file)" class="f-file-list__chip">
          <div v-if="isImage(file)" class="f-file-list__chip__preview__icon-wrapper">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
              <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
              </g>
            </svg>
          </div>
          <span class="truncate">
            {{ file.name }}
          </span>
        </a>
        <div @click="emit('remove', file)" class="px-2">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <f-modal v-model="preview.show">
    <img class="f-preview__image" :src="preview.url">
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
  url: 'https://imagenes.20minutos.es/files/image_640_360/uploads/imagenes/2022/10/05/one-piece-film-red.jpeg',
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
  @apply pt-6
  width: 100%
  display: flex
  flex-flow: row wrap

.f-file-list__wrapper
  @apply pr-4 py-2

.f-file-list__wrapper__item
  @apply py-1 pl-5 bg-gray-300 hover:bg-gray-400/60 ease-in duration-300
  display: flex
  align-items: center
  border-radius: 100px

.f-file-list__chip
  cursor: pointer
  height: 100%
  display: flex
  align-items: center
  max-width: 10rem

.f-file-list__chip__preview__icon-wrapper
  @apply pr-2 text-gray-500

.f-preview__image
  max-width: 100%
  max-height: 100%
</style>
