<script lang="ts">
import { VTextField } from 'vuetify/components'
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
    const { hintText, vmodel } = useTextField(props)

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

