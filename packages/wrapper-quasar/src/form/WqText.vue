<script lang="ts">
import { QInput } from 'quasar'
import type { QInputProps } from 'quasar'
import type { NormalizedTextField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useTextField } from '@fancy-crud/vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedTextField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hintText, vmodel, hasFieldErrors } = useTextField(props)

    return () =>
      h(QInput, {
        ...attrs,
        ...props.field,
        ...props.field.wrapper,
        ...vmodel.value,
        errorMessage: hintText.value,
        error: hasFieldErrors.value,
        hint: hintText.value,
        rules: undefined,
        // vmodel types the value as unknown while QInput declares it concretely: without
        // the cast, h() discards every overload and the declarations cannot be emitted.
        modelValue: vmodel.value.modelValue as QInputProps['modelValue'],
      }, {
        ...slots,
      })
  },
})
</script>

