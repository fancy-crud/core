<template>
  <f-control-wrap>
    <template v-if="isMultiple">
      <f-control-label :class="[errorStyles.textColor]">
        {{ field.label }}
      </f-control-label>

      <f-checkbox-multiple
        :field="field"
        class="pl-3"
      />
    </template>

    <f-checkbox-single
      v-else
      :field="field"
    />

    <f-control-hint-message />
  </f-control-wrap>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { useErrorStyles } from '@/composables'
import type { NormalizedFieldStructure } from '@/types'

const props = defineProps<{
  field: NormalizedFieldStructure
}>()

provide('field', props.field)

const errorStyles = useErrorStyles(props.field)
const isMultiple = computed(() => {
  return Array.isArray(props.field.options) && Array.isArray(props.field.modelValue)
})
</script>
