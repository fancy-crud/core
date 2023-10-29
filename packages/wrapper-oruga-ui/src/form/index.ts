import { ReturnObject } from '@fancy-crud/vue'
import WoText from './WoText.vue'
import WoTextarea from './WoTextarea.vue'
import WoColor from './WoColor.vue'
import WoPassword from './WoPassword.vue'
import WoSelect from './WoSelect.vue'
import WoRadio from './WoRadio.vue'
import WoCheckbox from './WoCheckbox.vue'
import WoFile from './WoFile.vue'
import WoDatepicker from './WoDatepicker.vue'

export const form = ReturnObject({
  text: WoText,
  password: WoPassword,
  color: WoColor,
  select: WoSelect,
  radio: WoRadio,
  checkbox: WoCheckbox,
  file: WoFile,
  datepicker: WoDatepicker,
  textarea: WoTextarea,
})

export {
  WoText,
  WoColor,
  WoPassword,
  WoSelect,
  WoRadio,
  WoCheckbox,
  WoFile,
  WoDatepicker,
  WoTextarea,
}
