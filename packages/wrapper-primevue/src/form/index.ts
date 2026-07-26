import { ReturnObject } from '@fancy-crud/vue'
import FwText from './FwText.vue'
import FwTextarea from './FwTextarea.vue'
import FwColor from './FwColor.vue'
import FwPassword from './FwPassword.vue'
import FwSelect from './FwSelect.vue'
import FwRadio from './FwRadio.vue'
import FwCheckbox from './FwCheckbox.vue'
import FwFile from './FwFile.vue'
import FwDatepicker from './FwDatepicker.vue'
import FwField from './FwField.vue'

export const form = ReturnObject({
  text: FwText,
  password: FwPassword,
  color: FwColor,
  select: FwSelect,
  radio: FwRadio,
  checkbox: FwCheckbox,
  file: FwFile,
  datepicker: FwDatepicker,
  textarea: FwTextarea,
})

export {
  FwText,
  FwColor,
  FwPassword,
  FwSelect,
  FwRadio,
  FwCheckbox,
  FwFile,
  FwDatepicker,
  FwTextarea,
  FwField,
}
