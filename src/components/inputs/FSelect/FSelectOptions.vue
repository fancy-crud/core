<template>
  <ul
    v-click-outside="triggerClickOutside"
    ref="optionsList"
    :style="{ width: props.listWidth }"
    class="select-list shadow-lg absolute z-10 bg-white bottom-100% left-0 max-h-56 overflow-y-auto divide-y"
  >
    <f-progress-bar
      v-if="props.loading"
      class="fixed top-0 left-0"
      :style="{ width: props.listWidth }"
    />
    <slot name="first-option">
      <li
        v-if="field.multiple"
        @click="state.selectAll = !state.selectAll"
        class="flex items-center p-4 cursor-pointer"
      >
        <input
          type="checkbox"
          class="mr-3"
          :checked="state.selectAll"
        >
        <span class="text-gray-500">Select all</span>
      </li>
    </slot>
    <li
      v-for="(option, optionIndex) in computedOptions"
      @click="toggleOption(option, !option._isSelected)"
      :key="`options-${optionIndex}`"
      class="flex items-center px-4 py-4 cursor-pointer hover--background"
      :class="{ 'bg-primary-500 text-white': option._isSelected }"
    >
      <slot
        v-bind="{ option }"
        name="prepend-option"
      >
        <input
          v-if="field.multiple"
          class="mr-3"
          type="checkbox"
          :checked="option._isSelected"
        >
      </slot>
      <span>{{ getOptionLabel(option) }}</span>
      <slot
        v-bind="{ option }"
        name="append-option"
      />
    </li>
    <slot name="last-option" />
  </ul>
</template>

<script lang='ts' setup>
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'

interface Option {
  _isSelected?: boolean
  value: unknown
}

const props = defineProps<{
  listWidth: string
  modelValue: unknown
  search?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown | unknown[]): void
  (e: 'clickOutside'): void
  (e: 'scrollBottom'): void
}>()

const vClickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: any) => {
      if (!(el === event.target || el.contains(event.target)))
        binding.value()
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el: any) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}

const optionsList = ref<HTMLElement | null>()
const state = reactive({
  modelValue: props.modelValue,
  selectAll: false,
  options: [] as Option[],
  showOptions: false,
})

const field = computed(() => inject('field') as NormalizedFieldStructure)
const optionLabel = computed(() => field.value.optionLabel || 'label')
const getOptionLabel = computed(() => (option: Option) => {
  if (option.value !== null && typeof option.value === 'object') {
    type OptionKey = keyof typeof option.value
    return option.value[optionLabel.value as OptionKey]
  }

  return option.value
})

const computedOptions = computed(() => {
  return state.options.filter((option) => {
    if (option.value !== null && typeof option.value === 'object') {
      type OptionKey = keyof typeof option.value
      return String(option.value[optionLabel.value as OptionKey]).includes(props.search || '')
    }

    return String(option.value).includes(props.search || '')
  })
})

const selectedOptions = computed(() => {
  if (field.value.multiple) {
    const result = state.options.reduce((previous, current) => {
      if (current._isSelected) {
        previous.push(current.value)
        return previous
      }

      return previous
    }, [] as unknown[])

    return result
  }

  return state.options.find(option => option._isSelected)?.value || null
})

onMounted(normalizeOptions)
onMounted(watchOptionsListScroll)

watch(() => state.selectAll, () => onSelectAll())
watch(() => JSON.stringify(field.value.options), () => {
  normalizeOptions()
})
watch(() => props.modelValue, () => {
  state.modelValue = props.modelValue
  normalizeOptions()
})

function normalizeOptions() {
  const options = field.value.options?.map((option) => {
    const normalizedOption: Option = { _isSelected: false, value: option }

    if (field.value.multiple) {
      if (Array.isArray(state.modelValue))
        normalizedOption._isSelected = state.modelValue.some(_option => _.isEqual(_option, normalizedOption.value))
    }
    else {
      normalizedOption._isSelected = _.isEqual(state.modelValue, option)
    }

    return normalizedOption
  })

  state.options = options || []
}

function watchOptionsListScroll() {
  if (!optionsList.value)
    return

  optionsList.value.addEventListener('scroll', () => {
    if (optionsList.value && optionsList.value.scrollTop + optionsList.value.clientHeight >= optionsList.value.scrollHeight)
      emit('scrollBottom')
  })
}

function toggleOption(option: Option, isSelected: boolean, updateModelValue = true) {
  if (!field.value.multiple)
    computedOptions.value.forEach(_option => _option._isSelected = false)

  option._isSelected = isSelected

  if (updateModelValue) {
    const options = selectedOptions.value
    emit('update:modelValue', options)
  }
}

function onSelectAll() {
  if (!Array.isArray(state.modelValue) || !state.modelValue)
    return

  state.options.forEach(option => toggleOption(option, state.selectAll, false))

  const options = selectedOptions.value
  emit('update:modelValue', options)
}

function triggerClickOutside() {
  if (!state.showOptions) {
    state.showOptions = true
    return
  }

  emit('clickOutside')
  state.showOptions = false
}

defineExpose({
  clear: (index?: number) => {
    if (!state.options?.length)
      return

    if (index === -1 && Array.isArray(state.modelValue)) {
      const _option = state.modelValue.pop()

      state.options.some((option) => {
        if (_.isEqual(option.value, _option)) {
          toggleOption(option, false)
          return true
        }
        return false
      })
      return
    }

    if (typeof index === 'number') {
      toggleOption(state.options[index], false)
      return
    }

    state.options.forEach((option) => {
      toggleOption(option, false, false)
    })

    const options = selectedOptions.value
    emit('update:modelValue', options)
  },
})
</script>
