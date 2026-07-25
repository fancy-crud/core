<script lang="ts">
import { QInput } from 'quasar'
import type { QInputProps } from 'quasar'
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
        // Ver WqText.vue: vmodel tipa el valor como unknown y QInput lo declara concreto.
        modelValue: vmodel.value.modelValue as QInputProps['modelValue'],
      }, {
        ...slots,
      })
  },
})
</script>

