import { ReturnObject } from '../common'
import Text from './Text.vue'
import Color from './Color.vue'
import Password from './Password.vue'
import Select from './Select.vue'
import Radio from './Radio.vue'
import Checkbox from './Checkbox.vue'
import File from './File.vue'
import Datepicker from './Datepicker.vue'

export const fields = ReturnObject({
  text: Text,
  password: Password,
  color: Color,
  select: Select,
  radio: Radio,
  checkbox: Checkbox,
  file: File,
  datepicker: Datepicker,
})
