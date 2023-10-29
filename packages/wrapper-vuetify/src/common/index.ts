import { ReturnObject } from '@fancy-crud/vue'
import WvButton from './WvButton.vue'
import WvModal from './WvModal.vue'
// import WvLoadingIcon from './WvLoadingIcon.vue'

export const common = ReturnObject({
  button: WvButton,
  modal: WvModal,
})

export {
  WvButton,
  WvModal,
  // WvLoadingIcon,
}
