<template>
  <f-control-wrap>
    <f-control-label :class="[errorStyles.textColor]">
      {{ field.label }}
    </f-control-label>

    <div
      @click="openPopper"
      ref="triggerElement"
      class="relative"
    >
      <div
        class="flex flex-nowrap items-center justify-between border border-gray-300 rounded-md px-2"
        :class="[errorStyles.borderColor]"
      >
        <slot name="prepend" />
        <div class="flex flex-wrap flex-auto items-center">
          <div
            v-for="(option, optionIndex) in selectedOptions"
            :key="option"
            class="mr-1 grow-0"
          >
            <f-chip
              v-if="props.field.chips"
              class="text-black pt-2 pb-2 pr-4 pl-4 font-bold"
            >
              {{ option }}
            </f-chip>
            <span v-else>{{ option }}</span>

            <template v-if="displayComma(optionIndex)">
              <span>,</span>
            </template>
          </div>
          <input
            v-if="isAutocomplete"
            v-model="state.searchTerm"
            @keydown.backspace="remove"
            ref="input"
            :placeholder="placeholder"
            type="text"
            class="border-0 focus:border-none focus:outline-none focus:ring-0 focus:shadow-outline flex-auto px-0 grow"
          >
        </div>
        <slot
          v-bind="clear"
          name="append"
        >
          <div>
            <f-button
              v-if="displayClearButton"
              @click="clear"
              icon="mdi mdi-close"
              class="bg-transparent"
            />
          </div>
        </slot>
        <div>
          <f-button
            class="bg-transparent focus:ring-0 focus:outline-none"
            icon="mdi mdi-chevron-down"
          />
        </div>
      </div>
    </div>
    <f-control-hint-message />
  </f-control-wrap>

  <teleport to="body">
    <div
      ref="targetElement"
    >
      <f-select-options
        v-show="popper"
        v-model="state.modelValue"
        @click-outside="closePopper"
        @scroll-bottom="loadMoreOptions"
        ref="optionsList"
        :search="state.searchTerm"
        :list-width="listWidth"
        :loading="isFetchingRecords"
      />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, watch } from 'vue'
import _ from 'lodash'
import type { Instance as PopperInstance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import type { NormalizedFieldStructure, RecordManager } from '@/types'
import { addOptionsToField, getRecords, useErrorStyles } from '@/composables'

interface State {
  modelValue: unknown
  listWidth: number
  searchTerm: string
  showOptions?: boolean
  bounceTimer?: NodeJS.Timeout
  selectAll?: boolean
  clonedOptions: unknown[]
}

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

provide('field', props.field)

let recordsManager: RecordManager | null = null

const errorStyles = useErrorStyles(props.field)
const triggerElement = ref<HTMLElement>()
const targetElement = ref<HTMLElement>()
const popper = ref<PopperInstance | null>()
const optionsList = ref()
const input = ref<HTMLInputElement | null>()
const state = reactive<State>({
  listWidth: 0,
  searchTerm: '',
  modelValue: props.field.modelValue,
  clonedOptions: _.cloneDeep(props.field.options) || [],
})

setupRecordsManager()
setupModelValue()

window.onresize = () => {
  state.listWidth = triggerElement.value?.offsetWidth || 0
}

const isAutocomplete = computed(() => {
  return props.field.type !== 'select'
})
const optionLabel = computed(() => props.field.optionLabel || '')
const listWidth = computed(() => {
  const width = state.listWidth || triggerElement.value?.offsetWidth
  return `${width}px`
})

const selectedOptions = computed(() => {
  if (Array.isArray(state.modelValue)) {
    return state.modelValue.map((option) => {
      if (typeof option === 'object') {
        type OptionLabel = keyof typeof option
        return option[optionLabel.value as OptionLabel]
      }

      return option
    })
  }

  if (state.modelValue) {
    if (typeof state.modelValue === 'object') {
      type OptionLabel = keyof typeof state.modelValue
      return [state.modelValue[optionLabel.value as OptionLabel]]
    }

    return [state.modelValue]
  }

  return []
})

const placeholder = computed(() => {
  const isArrayAndEmpty = Array.isArray(props.field.modelValue) && !props.field.modelValue.length
  return !props.field.modelValue || isArrayAndEmpty ? props.field.placeholder : ''
})

const isFetchingRecords = computed(() => {
  return recordsManager?.loading.value
})

const displayClearButton = computed(() => {
  let display = props.field.clearable

  if (!display)
    return false

  if (Array.isArray(props.field.modelValue))
    display = !!props.field.modelValue.length
  else
    display = !!props.field.modelValue

  return display
})

watch(() => state.searchTerm, () => {
  openPopper()
  if (state.bounceTimer)
    clearInterval(state.bounceTimer)

  state.bounceTimer = setTimeout(() => {
    if (!recordsManager)
      return

    recordsManager.search.value = state.searchTerm
  }, 1000)
})

watch(() => state.modelValue, (modelValue) => {
  Object.assign(props.field, { modelValue })
  if (popper.value)
    popper.value.update()

  input.value?.focus()
  state.searchTerm = ''
})

watch(() => recordsManager?.list.items, () => {
  if (!props.field.options || !recordsManager)
    return

  addOptionsToField(props.field, recordsManager?.list.items)
})

function displayComma(optionIndex: number) {
  return !props.field.chips && (optionIndex !== selectedOptions.value.length - 1 || state.searchTerm)
}

function setupRecordsManager() {
  if (props.field.url) {
    recordsManager = getRecords({
      url: props.field.url,
      initialFilterParams: props.field.filterParams as object,
    })
  }
}

function loadMoreOptions() {
  if (!props.field.url || !props.field.options || !recordsManager)
    return

  const updatePaginationPage = (
    (recordsManager.pagination.page === 1 && !recordsManager.list.items.length)
    || props.field.options.length < recordsManager.pagination.count
  )

  if (updatePaginationPage)
    recordsManager.pagination.page++
}

function openPopper() {
  if (triggerElement.value && targetElement.value)
    popper.value = createPopper(triggerElement.value, targetElement.value, { placement: 'bottom-start' })
}

function closePopper() {
  if (popper.value) {
    popper.value.destroy()
    popper.value = null
  }
}

function setupModelValue() {
  if (!props.field.multiple)
    return

  if (!state.modelValue)
    state.modelValue = []
}

function remove() {
  if (state.searchTerm || !state.modelValue)
    return

  optionsList.value.clear(-1)
}

function clear() {
  optionsList.value.clear()
}
</script>
