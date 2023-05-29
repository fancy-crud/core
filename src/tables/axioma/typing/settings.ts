export interface RawTableSetting extends Record<string, unknown> {
  url: string
  lookupField?: string
}

export interface NormalizedTableSetting extends Required<RawTableSetting> {}
