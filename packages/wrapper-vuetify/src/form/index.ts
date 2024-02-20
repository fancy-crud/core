import { ReturnObject } from '@fancy-crud/vue'
import WvText from './WvText.vue'
import WvTextarea from './WvTextarea.vue'
import WvColor from './WvColor.vue'
import WvPassword from './WvPassword.vue'
import WvSelect from './WvSelect.vue'
import WvRadio from './WvRadio.vue'
import WvCheckbox from './WvCheckbox.vue'
import WvFile from './WvFile.vue'
import WvDatepicker from './WvDatepicker.vue'

export const form = ReturnObject({
  text: WvText,
  password: WvPassword,
  color: WvColor,
  select: WvSelect,
  radio: WvRadio,
  checkbox: WvCheckbox,
  file: WvFile,
  datepicker: WvDatepicker,
  textarea: WvTextarea,
})

export {
  WvText,
  WvColor,
  WvPassword,
  WvSelect,
  WvRadio,
  WvCheckbox,
  WvFile,
  WvDatepicker,
  WvTextarea,
}
