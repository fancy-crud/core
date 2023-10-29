<script lang="ts">
import { VSelect } from 'vuetify/components'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useSelectField } from '@fancy-crud/vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedSelectField>,
      required: true,
    },
  },

  setup(props, { attrs: vAttrs, slots }) {
    const { vmodel, hintText, attrs } = useSelectField(props)

    return () =>
      h(VSelect, {
        ...props.field.wrapper,
        ...attrs.value,
        ...vmodel.value,
        vAttrs,
        label: props.field.label,
        hint: hintText.value,
        errorMessages: props.field.errors,
        items: props.field.options,
        itemTitle: props.field.optionLabel,
        itemValue: props.field.optionValue,
      }, slots)
  },
})
</script>

