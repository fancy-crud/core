<script lang="ts">
import { OSelect } from '@oruga-ui/oruga-next'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useSelectField } from '@fancy-crud/vue'
import WoField from './WoField.vue'

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
    const { vmodel, hasFieldErrors, hintText, options, attrs } = useSelectField(props)

    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    function renderOptions() {
      return options.value.map(
        ([label, value]) => h(
          'option', { value }, {
            default: () => String(label),
            ...slots,
          }),
      )
    }

    return () =>
      h(WoField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h(OSelect, { ...vAttrs, ...attrs.value, ...vmodel.value, expanded: true }, {
          default: () => renderOptions(),
        }),
      })
  },
})
</script>

