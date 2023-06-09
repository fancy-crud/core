<script lang="ts">
import { ODatepicker, OField } from '@oruga-ui/oruga-next'
import type { NormalizedDatepickerField } from '@fancy-crud/core'
import type { PropType } from 'vue'
import { useDatepickerField } from '@/forms/integration'
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
      h(OField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h(ODatepicker, { ...attrs, ...filterAttrs.value, ...vmodel }, slots),
      })
  },
})
</script>

