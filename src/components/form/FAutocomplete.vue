<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <f-control-label>{{ field.label }}</f-control-label>
    <div
      v-click-outside="() => state.showOptions = false"
      @click="openOptions"
      class="relative"
    >
      <div class="flex flex-nowrap items-center justify-between border border-gray-300 rounded-md px-2">
        <slot name="prepend" />
        <div class="flex flex-wrap flex-auto items-center">
          <div
            v-for="(option, optionIndex) in selectedOptions"
            :key="option"
            class="mr-2 shrink-1"
          >
            <span>{{ option }}</span>
            <template v-if="optionIndex !== selectedOptions.length - 1">
              <span>,</span>
            </template>
          </div>
          <input
            v-model="state.searchTerm"
            @keydown.enter="insert"
            @keydown.backspace="remove"
            ref="input"
            type="text"
            class="border-0 focus:border-none focus:outline-none focus:ring-0 focus:shadow-outline flex-auto px-0 shrink-0"
          >
        </div>
        <slot
          v-bind="clear"
          name="append"
        >
          <div class="w-10">
            <f-button-icon
              v-if="props.field.clearable"
              @click="clear"
              text-color="text-gray-400"
              icon="mdi-close"
            />
          </div>
        </slot>
      </div>
      <ul
        class="shadow-lg absolute w-full z-10 bg-white bottom-100% left-0 max-h-56 overflow-y-auto divide-y"
        :class="{'hidden': !state.showOptions }"
      >
        <slot name="first-option">
          <li class="flex items-center p-4">
            <input
              @change="onSelectAll"
              type="checkbox"
              class="mr-3"
              :checked="state.selectAll"
            >
            <span class="text-gray-500">Select all</span>
          </li>
        </slot>
        <li
          v-for="(option, optionIndex) in state.options"
          @click="insert(option)"
          :key="`options-${optionIndex}`"
          class="flex items-center px-4 py-4 cursor-pointer hover--background"
          :class="{'bg-primary-500 text-white': option._isSelected}"
        >
          <slot
            v-bind="{ option }"
            name="prepend-option"
          >
            <input
              class="mr-3"
              type="checkbox"
              :checked="option._isSelected"
            >
          </slot>
          <span>{{ option.name }}</span>
          <slot
            v-bind="{ option }"
            name="append-option"
          />
        </li>
        <slot name="last-option" />
      </ul>
    </div>
    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { NormalizedFieldStructure } from '@/types'

interface Option {
  _isSelected?: boolean
  [key: string]: any
}

type ModelValue = Option | Option[] | null

interface State {
  modelValue: ModelValue
  searchTerm: string
  options: Option[]
  showOptions?: boolean
  bounceTimer?: NodeJS.Timeout
  selectAll?: boolean
}

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const vClickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: any) => {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el: any) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}

const input = ref<HTMLInputElement | null>()
const state = reactive<State>({
  modelValue: null,
  searchTerm: '',
  options: [] as Option[],
})

setupModelValue()
setupOptions()

const selectedOptions = computed(() => {
  if (!Array.isArray(state.modelValue)) {
    if (state.modelValue) return [state.modelValue.name]
    else return []
  }

  return state.modelValue.map((item: any) => item.name)
})

function setupModelValue() {
  if (!state.modelValue && props.field.multiple)
    state.modelValue = []
}

function setupOptions() {
  const options = _.cloneDeep(props.field.options || [])
  state.options = options.map(option => ({
    _isSelected: false,
    ...option,
  }))
}

function onSelectAll() {
  state.selectAll = !state.selectAll
  state.options.forEach(option => option._isSelected = state.selectAll)
  state.modelValue = state.options.filter(option => option._isSelected)
}

function openOptions() {
  state.showOptions = true

  if (input.value)
    input.value.focus()
}

function remove() {
  if (state.searchTerm && !state.modelValue) return

  if (Array.isArray(state.modelValue) && state.modelValue.length) {
    const obj = state.modelValue.pop()

    if (obj) obj._isSelected = false
    state.modelValue = [...state.modelValue]
    return
  }

  if (!state.modelValue || Array.isArray(state.modelValue)) return

  state.modelValue._isSelected = false
  state.modelValue = null
}

function clear() {
  if (Array.isArray(state.modelValue)) {
    state.modelValue.forEach(option => option._isSelected = false)
    state.modelValue = []
    return
  }

  if (state.modelValue) {
    const oldValue = state.modelValue
    state.modelValue = null
    oldValue._isSelected = false
  }
}

function insert(value: any) {
  if (props.field.multiple) {
    value._isSelected = !value._isSelected
    state.modelValue = state.options.filter(option => option._isSelected)
    state.searchTerm = ''
    return
  }

  let oldValue: any
  if (state.modelValue)
    oldValue = state.modelValue

  if (_.isEqual(oldValue, value) && value._isSelected) {
    value._isSelected = false
    state.modelValue = null
    return
  }

  value._isSelected = true
  state.modelValue = value

  if (oldValue)
    oldValue._isSelected = false
}

watch(() => state.selectAll, () => {
  console.log('vale')
})

watch(() => state.searchTerm, () => {
  if (state.bounceTimer)
    clearInterval(state.bounceTimer)

  state.bounceTimer = setTimeout(() => {
    console.log('hello')
  }, 1000)
})

watch(() => state.modelValue, () => {
  if (props.field.multiple) {
    Object.assign(props.field, {
      modelValue: state.options.filter(
        option => option._isSelected,
      ).map((option) => {
        const { _isSelected, ...obj } = option
        return obj
      }),
    })
    return
  }

  if (!state.modelValue) {
    Object.assign(props.field, { modelValue: state.modelValue })
    return
  }

  if (Array.isArray(state.modelValue)) return

  const { _isSelected, ...modelValue } = state.modelValue
  Object.assign(props.field, { modelValue })
})
</script>
