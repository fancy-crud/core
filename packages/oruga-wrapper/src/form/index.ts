import { ReturnObject } from '@fancy-crud/vue'
import OwText from './OwText.vue'
import OwTextarea from './OwTextarea.vue'
import OwColor from './OwColor.vue'
import OwPassword from './OwPassword.vue'
import OwSelect from './OwSelect.vue'
import OwRadio from './OwRadio.vue'
import OwCheckbox from './OwCheckbox.vue'
import OwFile from './OwFile.vue'
import OwDatepicker from './OwDatepicker.vue'

export const form = ReturnObject({
  text: OwText,
  password: OwPassword,
  color: OwColor,
  select: OwSelect,
  radio: OwRadio,
  checkbox: OwCheckbox,
  file: OwFile,
  datepicker: OwDatepicker,
  textarea: OwTextarea,
})

export {
  OwText,
  OwColor,
  OwPassword,
  OwSelect,
  OwRadio,
  OwCheckbox,
  OwFile,
  OwDatepicker,
  OwTextarea,
}
