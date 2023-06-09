<script lang="ts">
import { OField, OInput } from '@oruga-ui/oruga-next'
import type { NormalizedColorField } from '@fancy-crud/core'
import type { PropType } from 'vue'
import { useColorField } from '@/forms/integration'
export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedColorField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hasFieldErrors, hintText, vmodel } = useColorField(props)
    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    return () =>
      h(OField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h(OInput, { ...attrs, ...props.field, ...vmodel }, slots),
      })
  },
})
</script>

