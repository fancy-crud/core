import { ReturnObject } from '@fancy-crud/vue'
import WoButton from './WoButton.vue'
import WoModal from './WoModal.vue'
import WoLoadingIcon from './WoLoadingIcon.vue'

export const common = ReturnObject({
  button: WoButton,
  modal: WoModal,
})

export {
  WoButton,
  WoModal,
  WoLoadingIcon,
}
