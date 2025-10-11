<script lang="ts">
import { getDefaults } from '@fancy-crud/core'
import Dialog from 'primevue/dialog'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    },
    form: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (_payload: boolean) => true,
  },
  setup(props: any, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)

    const defaults = computed(getDefaults)

    return () =>
      h(Dialog, {
        modal: true,
        ...defaults.value.modal,
        ...attrs,
        'visible': modelValue.value,
        'onUpdate:visible': (e: boolean) => modelValue.value = e,
        'header': " ",
      }, slots)
  },
})
</script>

<style>
.p-dialog-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.p-dialog-content {
  padding-top: 1.5rem;
}
</style>