<script lang="ts">
import _ from 'lodash'
import { OField, ORadio } from '@oruga-ui/oruga-next'
import type { NormalizedRadioField } from '@fancy-crud/core'
import type { PropType } from 'vue'
import { useRadioField } from '@/forms/integration'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedRadioField>,
      required: true,
    },
  },

  setup(props, { attrs, slots }) {
    const { vmodel, hasFieldErrors, hintText, inRowDisplay, options } = useRadioField(props)

    const nameIdentifier = Symbol(props.field.modelKey).toString()

    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    function renderOptions() {
      return options.value.map(
        ([label, value]) => h(
          ORadio, { ...attrs, ...vmodel, name: nameIdentifier, nativeValue: value }, {
            default: () => String(label),
            ...slots,
          }),
      )
    }

    return () =>
      h(OField, { ...props.field.wrapper, label: props.field.label, message: hintText.value, variant: variant.value }, {
        default: () => h('div', { class: inRowDisplay },
          renderOptions(),
        ),
      })
  },
})
</script>

