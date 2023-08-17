<script lang="ts">
import type { NormalizedColorField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { OField, OInput } from '@oruga-ui/oruga-next'
import { useColorField } from '@fancy-crud/vue'

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
        default: () => h(OInput, { ...attrs, ...props.field, ...vmodel.value }, slots),
      })
  },
})
</script>

