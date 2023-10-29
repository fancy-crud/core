<script lang="ts">
import { VTextarea } from 'vuetify/components'
import type { NormalizedTextareaField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useTextareaField } from '@fancy-crud/vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedTextareaField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { modelValue, hintText } = useTextareaField(props)

    return () =>
      h(VTextarea, {
        ...props.field.wrapper,
        ...attrs,
        ...props.field,
        modelValue,
        label: props.field.label,
        hint: hintText.value,
        errorMessages: props.field.errors,
      }, slots)
  },
})
</script>

