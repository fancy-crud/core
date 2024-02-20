<script lang="ts">
import { VTextField } from 'vuetify/components'
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
    const { hintText, vmodel } = usePasswordField(props)

    return () =>
      h(VTextField, {
        ...attrs,
        ...props.field,
        ...props.field.wrapper,
        ...vmodel.value,
        errorMessages: props.field.errors,
        hint: hintText.value,
        rules: undefined,
      }, {
        ...slots,
      })
  },
})
</script>

