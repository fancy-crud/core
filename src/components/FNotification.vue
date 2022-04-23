<template>
  <teleport to="body">
    <div
      :class="containerClass"
    >
      <div class="flex items-center pl-8">
        <i
          class="text-xl"
          :class="icon"
        />
      </div>
      <div class="card-body">
        <div>
          <h2 class="mb-0 text-md font-bold">
            {{ message }}
          </h2>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  message: string
  modelValue: boolean
  backgroundColor?: string
  textColor?: string
  icon?: string
  duration?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean)
}>()

const isComponentMounted = ref(false)
const display = ref(props.modelValue)

const containerClass = computed(() => {
  const _default = 'card card-side shadow-lg transition-all duration-1000 animate__animated fixed top-5 right-5 max-w-xs sm:max-w-md w-full'
  const displayClass = display.value ? 'animate__fadeInRight' : 'animate__fadeOutRight'
  const classGroup = [_default, displayClass]

  if (props.backgroundColor) classGroup.push(props.backgroundColor)
  if (props.textColor) classGroup.push(props.textColor)

  return classGroup.join(' ')
})

const dispatchNotification = () => {
  setTimeout(() => {
    display.value = false
  }, props.duration)
}

watch(display, () => {
  if (display.value && props.duration) dispatchNotification()

  emit('update:modelValue', display.value)
})

watch(() => props.modelValue, (value: boolean) => {
  display.value = value
})

onMounted(() => {
  if (props.duration) dispatchNotification()
})

</script>
