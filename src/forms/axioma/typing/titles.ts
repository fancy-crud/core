export interface RawTitle {
  create?: string
  update?: string
}

export interface NormalizedTitles extends Required<RawTitle> {}
