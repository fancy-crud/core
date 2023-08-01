import { enumGenerator } from '@/common/helpers'

export const DEFAULT_LOOKUP_FIELD = 'id'

export const FORM_MODE = enumGenerator([
  'create',
  'update',
])

export type FormMode = keyof typeof FORM_MODE
