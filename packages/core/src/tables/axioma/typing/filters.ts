export interface RawTableFilters extends Record<string, unknown> {}

export interface NormalizedTableFilters extends Required<RawTableFilters> {}
