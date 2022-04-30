<template>
  <div
    v-bind="$attrs"
    ref="notificationRef"
    :class="[props.backgroundColor, props.textColor]"
    class="flex items-center w-full max-w-md px-4 py-6 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white rounded-lg dark:bg-orange-700 dark:text-orange-200">
      <i
        class="text-xl"
        :class="props.icon"
      />
    </div>
    <div class="text-sm font-bold text-left pr-4">
      {{ props.message }}
    </div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 text-white hover:bg-gray-100/20 rounded-lg p-1.5 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-warning"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      /></svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  message: string
  backgroundColor?: string
  textColor?: string
  icon?: string
  duration?: number
  appendCount?: number
}>()

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

const notificationRef = ref()

console.log(props)

onMounted(() => {
  const dismiss = new Dismiss(notificationRef.value, {
    timing: 'ease-out',
    onHide() {
      emit('dismiss')
    },
  })

  setTimeout(() => {
    dismiss.hide()
  }, props.duration)
})

</script>
