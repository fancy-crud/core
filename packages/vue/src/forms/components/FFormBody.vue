<template>
  <main
    ref="bodyRef"
    class="f-form__body"
    v-bind="$attrs"
    @scroll="handleScroll"
  >
    <template
      v-for="([fieldKey, field]) in computedFields"
      :key="fieldKey"
    >
      <slot :name="`before-field-${fieldKey}`" v-bind="{ field }" />
      <slot :name="`field-${fieldKey}`" v-bind="binding(field)">
        <component
          :is="field.getComponent()"
          v-bind="binding(field)"
        />
      </slot>
      <slot :name="`after-field-${fieldKey}`" v-bind="{ field }" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import { computed, watch, Ref, onMounted, inject, nextTick } from 'vue'
import type { BaseObjectWithNormalizedFields, FormMode, NormalizedField, NormalizedSettings } from '@fancy-crud/core'
import { Bus, FilterFieldsByFormModeCommand, GetForeignKeyValuesCommand } from '@fancy-crud/core'

const props = defineProps<{
  formId: symbol
  fields: BaseObjectWithNormalizedFields
  settings: NormalizedSettings
}>()

// Scroll detection state
const bodyRef = ref<HTMLElement | null>(null)

// Inject scroll state from parent FForm
const formScrollState = inject<{
  isScrolledFromTop: Ref<boolean>
  isScrolledFromBottom: Ref<boolean>
}>('formScrollState', {
  isScrolledFromTop: ref(false),
  isScrolledFromBottom: ref(false),
})

const isScrolledFromTop = formScrollState.isScrolledFromTop
const isScrolledFromBottom = formScrollState.isScrolledFromBottom

const bus = new Bus()

const computedFields = computed(() => filterFields(props.fields, props.settings.mode).filter(
  ([_, field]) => field.hidden !== true),
)

// Handle scroll event to detect position
function handleScroll() {
  if (!bodyRef.value) return

  const { scrollTop, scrollHeight, clientHeight } = bodyRef.value
  const scrollThreshold = 5 // pixels

  // Check if content is scrollable
  const isScrollable = scrollHeight > clientHeight

  if (!isScrollable) {
    // Content fits, no shadows needed
    isScrolledFromTop.value = false
    isScrolledFromBottom.value = false
    return
  }

  // Check if scrolled from top (has content above)
  isScrolledFromTop.value = scrollTop > scrollThreshold

  // Check if not at bottom (has content below)
  const isAtBottom = scrollTop >= scrollHeight - clientHeight - scrollThreshold
  isScrolledFromBottom.value = !isAtBottom
}

// Check scroll position on mount and after content changes
onMounted(() => {
  const fields = Object.fromEntries(
    filterFields(props.fields, props.settings.mode),
  )
  bus.execute(
    new GetForeignKeyValuesCommand(fields),
  )

  // Check scroll position after content is rendered with a small delay
  nextTick(() => {
    setTimeout(() => {
      handleScroll()
    }, 100)
  })
})

// Re-check scroll when computed fields change
watch(computedFields, () => {
  nextTick(() => {
    setTimeout(() => {
      handleScroll()
    }, 100)
  })
})

function filterFields(fields: BaseObjectWithNormalizedFields, mode: FormMode): [string, NormalizedField][] {
  const filteredFields = bus.execute(
    new FilterFieldsByFormModeCommand(fields, mode),
  ) as [string, NormalizedField][]

  return filteredFields
}

function binding(field: NormalizedField) {
  return {
    formId: props.formId, field, class: 'f-form__body__field col-span-12',
  }
}
</script>
