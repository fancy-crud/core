<script lang="ts">
import { ElOption, ElSelect } from 'element-plus'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useSelectField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

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
    const { vmodel, hintText, options, attrs } = useSelectField(props)

    function renderOptions() {
      return options.value.map(
        ([label, value]: any) => h(
          ElOption, { label, value }, {
            default: () => String(label),
            ...slots,
          }),
      )
    }

    return () =>
      h(WeField, { ...props.field.wrapper, label: props.field.label, message: hintText.value }, {
        default: () => h(ElSelect, { ...vAttrs, ...attrs.value, ...vmodel.value as any }, {
          default: () => renderOptions(),
        }),
      })
  },
})
</script>

