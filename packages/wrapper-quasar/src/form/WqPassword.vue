<script lang="ts">
import { QInput } from 'quasar'
import type { NormalizedPasswordField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { usePasswordField } from '@fancy-crud/vue'

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
    const { hintText, vmodel, hasFieldErrors } = usePasswordField(props)

    return () =>
      h(QInput, {
        ...attrs,
        ...props.field,
        ...props.field.wrapper,
        ...vmodel.value,
        errorMessage: hintText.value,
        hint: hintText.value,
        error: hasFieldErrors.value,
        rules: undefined,
      }, {
        ...slots,
      })
  },
})
</script>

