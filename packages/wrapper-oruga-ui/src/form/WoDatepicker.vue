<script lang="ts">
import { ODatepicker } from '@oruga-ui/oruga-next'
import type { NormalizedDatepickerField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useDatepickerField } from '@fancy-crud/vue'
import WoField from './WoField.vue'

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
    const { vmodel, hasFieldErrors, hintText } = useDatepickerField(props)
    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    const filterAttrs = computed(() => {
      const { type: _type, ...fieldAttrs } = props.field
      return fieldAttrs
    })
    return () =>
      h(WoField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h(ODatepicker, { ...attrs, ...filterAttrs.value, ...vmodel.value }, slots),
      })
  },
})
</script>

