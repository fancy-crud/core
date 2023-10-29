<script lang="ts">
import { VTextField } from 'vuetify/components'
import type { NormalizedDatepickerField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useDatepickerField } from '@fancy-crud/vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedDatepickerField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { hintText, vmodel } = useDatepickerField(props)

    return () =>
      h(VTextField, {
        ...attrs,
        ...props.field,
        ...props.field.wrapper,
        ...vmodel.value,
        errorMessages: props.field.errors,
        hint: hintText.value,
        rules: undefined,
        type: 'date',
      }, {
        ...slots,
      })
  },
})
</script>

