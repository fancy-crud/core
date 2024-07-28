<template>
  <a
    @mouseenter="togglePreview"
    ref="previewRef"
    target="_blank"
    :href="fileUrl"
    class="f-preview-trigger"
    :class="{ 'f-preview-trigger--disabled': !hasFile }"
  >
    <svg v-if="isImage" class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
    </svg>
    <svg v-else class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clip-rule="evenodd" />
    </svg>
    <span style="width: 100%" />
    <teleport to="body">
      <div
        @mouseleave="togglePreview"
        class="shadow-black f-preview shadow-2xl -translate-y-1/2"
        :class="displayPreview" :style="{ top: state.axis.y, left: state.axis.x }"
      >
        <a :href="fileUrl" target="_blank">
          <figure class="f-preview-img">
            <img :src="fileUrl" alt="">
          </figure>
        </a>
      </div>
    </teleport>
  </a>
</template>

<script lang="ts" setup>
import type { NormalizedField } from '@fancy-crud/core'

const props = defineProps<{
  formId: symbol
  field: NormalizedField
}>()

const state = reactive({
  isHover: false,
  axis: {
    x: '0px',
    y: '0px',
  },
})

const previewRef = ref<HTMLElement | null>(null)
const fileUrl = computed(() => {
  return props.field.fileUrl || undefined
})
const displayPreview = computed(() => state.isHover ? 'f-preview--scale-100' : 'f-preview--scale-0')
const hasFile = computed(() => {
  return !!fileUrl.value
})
const isImage = computed(() => checkIfFileIsImage(props.field.type, fileUrl.value))

onMounted(() => {
  setPreviewPosition()

  window.addEventListener('resize', () => {
    setPreviewPosition()
  })
})

function checkIfFileIsImage(fieldType: string, url?: string | null) {
  if (fieldType === 'image')
    return true

  const IMAGE_EXTENSIONS = /\.(jpeg|jpg|gif|png|webp)$/
  const result = props.field.fileUrl?.match(IMAGE_EXTENSIONS) !== null
  return result
}

function togglePreview() {
  state.isHover = !state.isHover
}

function setPreviewPosition() {
  setTimeout(() => {
    if (!previewRef.value)
      return

    const { top, left } = previewRef.value.getBoundingClientRect()
    state.axis.x = `${left}px`
    state.axis.y = `${top}px`
  }, 1000)
}
</script>

<style lang="sass">
.f-preview
  position: absolute
  max-height: 250px
  max-width: 250px
  min-height: fit-content
  height: fit-content
  width: fit-content
  overflow: hidden
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15)
  transform-origin: top left
  z-index: 9999
  transition: transform 0.5s ease

.f-preview-img
  width: 100%
  height: 100%
  background-size: contain
  background-position: 0 0
  background-repeat: no-repeat
  background-color: white

.f-preview--scale-0
  @extends .f-preview
  transform: scale(0) translateY(-50%)

.f-preview--scale-100
  @extends .f-preview
  transform: scale(1) translateY(-50%)

.f-preview-trigger--disabled
  opacity: 0.3
</style>
