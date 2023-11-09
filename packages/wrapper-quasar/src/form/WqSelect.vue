<template>
  <div>
    <q-select
      v-bind="{ ...props.field.wrapper, ...props.field, ...$attrs, ...attrs }"
      v-model="modelValue"
      :error-message="hintText"
      :error="hasFieldErrors"
    />
  </div>
</template>

<script lang="ts" setup>
import { QSelect } from 'quasar'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import { useSelectField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedSelectField
}>()
const { modelValue, hintText, attrs, hasFieldErrors } = useSelectField(props)

// export default defineComponent({
//   props: {
//     formId: {
//       type: Symbol,
//       required: true,
//     },
//     field: {
//       type: Object as PropType<NormalizedSelectField>,
//       required: true,
//     },
//   },

//   setup(props, { attrs: vAttrs, slots }) {

//     return () =>
//       h(QSelect as any, {
//         ...props.field.wrapper,
//         ...props.field,
//         ...attrs.value,
//         ...vmodel.value,
//         label: props.field.label,
//         hint: hintText.value,
//         errorMessages: props.field.errors,
//       }, slots)
//   },
// })
</script>

