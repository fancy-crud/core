<template>
  <f-control-wrap
    :field="field"
    :field-key="field.modelKey"
  >
    <template v-if="isMultiple">
      <f-control-label>
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

    <f-control-hint-message :field="field" />
  </f-control-wrap>
</template>

<script lang="ts" setup>
const props = defineProps<{
  field: NormalizedFieldStructure
}>()

const isMultiple = computed(() => {
  return Array.isArray(props.field.options) && Array.isArray(props.field.modelValue)
})
</script>
