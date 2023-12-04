export interface RawTableFilters extends Record<string, any> {}

export interface NormalizedTableFilters extends Required<RawTableFilters> {}
