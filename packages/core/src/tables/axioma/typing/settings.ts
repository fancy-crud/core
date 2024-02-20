import type { Row } from './table'

export interface RawTableSettings extends Record<string, unknown> {
  url?: string
  lookupField?: string
  skipDeleteConfirmation?: boolean
  displayFormDialog?: boolean
  displayConfirmationDialog?: boolean
  rowToDelete?: null | Row
}

export interface NormalizedTableSettings extends Required<RawTableSettings> {}
