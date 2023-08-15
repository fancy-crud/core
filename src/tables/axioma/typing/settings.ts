export interface RawTableSettings extends Record<string, unknown> {
  url?: string
  lookupField?: string
}

export interface NormalizedTableSettings extends Required<RawTableSettings> {
  skipDeleteConfirmation?: boolean
}
