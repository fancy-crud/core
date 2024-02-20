import type { FormMode } from '../constants'

export interface RawSetting {
  url?: string
  lookupField?: string
  lookupValue?: string
  mode?: FormMode
  title?: string
  disableResponseHandlers?: boolean
  disableNotifications?: boolean
  loading?: boolean
}

export interface NormalizedSettings extends RawSetting {
  mode: FormMode
  url: string
  lookupField: string
  title: string
  loading: boolean
}
