<script lang="ts">
import { OButton, OField, OIcon, OUpload } from '@oruga-ui/oruga-next'
import type { NormalizedFileField } from '@fancy-crud/core'
import type { PropType } from 'vue'
import { useFileField } from '@/forms/integration'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedFileField>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const { vmodel, hasFieldErrors, hintText, fileNames } = useFileField(props)

    const variant = computed(() => hasFieldErrors.value ? 'danger' : '')

    return () =>
      h(OField, { ...props.field.wrapper, label: props.field.label, variant: variant.value, message: hintText.value }, {
        default: () => [
          h(OUpload, { ...attrs, ...props.field, ...vmodel }, {
            default: () =>
              h(OButton, { tag: 'a', variant: 'primary', labelClass: 'flex items-center' }, {
                default: () => [
                  h(OIcon, { icon: 'upload' }),
                  h('span', { class: 'pl-4' }, { default: () => props.field.label }),
                ],
              }),
            ...slots,
          }),
          h('span', { class: 'file-name pl-4 flex items-center' }, {
            default: () => fileNames.value.join(', '),
          }),
        ],
      })
  },
})
</script>

