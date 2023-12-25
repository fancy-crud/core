import { ReturnObject } from '@fancy-crud/vue'
import WeText from './WeText.vue'
import WeTextarea from './WeTextarea.vue'
import WeColor from './WeColor.vue'
import WePassword from './WePassword.vue'
import WeSelect from './WeSelect.vue'
import WeRadio from './WeRadio.vue'
import WeCheckbox from './WeCheckbox.vue'
import WeFile from './WeFile.vue'
import WeDatepicker from './WeDatepicker.vue'
import WeField from './WeField.vue'

export const form = ReturnObject({
  text: WeText,
  password: WePassword,
  color: WeColor,
  select: WeSelect,
  radio: WeRadio,
  checkbox: WeCheckbox,
  file: WeFile,
  datepicker: WeDatepicker,
  textarea: WeTextarea,
})

export {
  WeText,
  WeColor,
  WePassword,
  WeSelect,
  WeRadio,
  WeCheckbox,
  WeFile,
  WeDatepicker,
  WeTextarea,
  WeField,
}
