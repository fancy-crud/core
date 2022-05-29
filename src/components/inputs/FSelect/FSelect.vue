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
            class="mr-2 grow-0"
          >
            <span>{{ option }}</span>
            <template v-if="optionIndex !== selectedOptions.length - 1">
              <span>,</span>
            </template>
          </div>
          <input
            v-if="props.field.type === 'autocomplete'"
            v-model="state.searchTerm"
            @keydown.backspace="remove"
            ref="input"
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
              v-if="props.field.clearable"
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
        ref="optionsList"
        :search="state.searchTerm"
        :list-width="listWidth"
      />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type { Instance as PopperInstance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import type { NormalizedFieldStructure } from '@/types'
import { useErrorStyles } from '@/composables'

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

setupModelValue()

window.onresize = () => {
  state.listWidth = triggerElement.value?.offsetWidth || 0
}

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

watch(() => state.searchTerm, () => {
  if (state.bounceTimer)
    clearInterval(state.bounceTimer)

  state.bounceTimer = setTimeout(() => {

  }, 1000)
})

watch(() => state.modelValue, (modelValue) => {
  Object.assign(props.field, { modelValue })
  if (popper.value)
    popper.value.update()

  input.value?.focus()
  state.searchTerm = ''
})

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
