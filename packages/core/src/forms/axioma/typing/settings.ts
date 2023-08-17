import type { FormMode } from '../constants'

export interface RawSetting {
  url?: string
  lookupField?: string
  lookupValue?: string
  mode?: FormMode
  disableResponseHandlers?: boolean
  disableNotifications?: boolean
}

export interface NormalizedSettings extends RawSetting {
  mode: FormMode
  url: string
  lookupField: string
}
