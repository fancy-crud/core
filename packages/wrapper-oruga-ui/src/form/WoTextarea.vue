<script lang="ts">
import { OInput } from '@oruga-ui/oruga-next'
import type { NormalizedTextareaField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useTextareaField } from '@fancy-crud/vue'
import WoField from './WoField.vue'

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
    const { modelValue, hasFieldErrors, hintText } = useTextareaField(props)
    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    return () =>
      h(WoField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h(OInput, { ...attrs, ...props.field, modelValue }, slots),
      })
  },
})
</script>

