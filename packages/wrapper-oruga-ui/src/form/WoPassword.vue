<script lang="ts">
import { OInput } from '@oruga-ui/oruga-next'
import type { NormalizedPasswordField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { usePasswordField } from '@fancy-crud/vue'
import WoField from './WoField.vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedPasswordField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { vmodel, hasFieldErrors, hintText } = usePasswordField(props)
    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    return () =>
      h(WoField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h(OInput, { ...attrs, ...props.field, ...vmodel.value }, slots),
      })
  },
})
</script>

