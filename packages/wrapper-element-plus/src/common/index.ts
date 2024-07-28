import { ReturnObject } from '@fancy-crud/vue'
import WeButton from './WeButton.vue'
import WeModal from './WeModal.vue'
export * from './notify'
// import WeLoadingIcon from './WeLoadingIcon.vue'

export const common = ReturnObject({
  button: WeButton,
  modal: WeModal,
})

export {
  WeButton,
  WeModal,
  // WeLoadingIcon,
}
