import { ReturnObject } from '@fancy-crud/vue'
import WqText from './WqText.vue'
import WqTextarea from './WqTextarea.vue'
import WqColor from './WqColor.vue'
import WqPassword from './WqPassword.vue'
import WqSelect from './WqSelect.vue'
import WqRadio from './WqRadio.vue'
import WqCheckbox from './WqCheckbox.vue'
import WqFile from './WqFile.vue'
import WqDatepicker from './WqDatepicker.vue'

export const form = ReturnObject({
  text: WqText,
  password: WqPassword,
  color: WqColor,
  select: WqSelect,
  radio: WqRadio,
  checkbox: WqCheckbox,
  file: WqFile,
  datepicker: WqDatepicker,
  textarea: WqTextarea,
})

export {
  WqText,
  WqColor,
  WqPassword,
  WqSelect,
  WqRadio,
  WqCheckbox,
  WqFile,
  WqDatepicker,
  WqTextarea,
}
