import type { NormalizedButton, RawButton } from '@packages/core/forms/axioma'
import type { Row } from './table'

export interface RawTableButton extends RawButton {}

export interface OnRowClick { onClick?: (row?: Row) => void }
export type EditButton = RawTableButton & OnRowClick
export type RemoveButton = RawTableButton & OnRowClick

export interface RawTableButtons {
  add?: RawTableButton & { onClick?: () => void }
  edit?: EditButton
  remove?: RemoveButton
  dump?: RawTableButton
  [extraButton: string]: RawTableButton | undefined
}

export interface NormalizedTableButton extends NormalizedButton {}

export interface NormalizedTableButtons {
  add: NormalizedTableButton & { onClick: () => void }
  edit: NormalizedTableButton & Required<OnRowClick>
  remove: NormalizedTableButton & Required<OnRowClick>
  dump: NormalizedTableButton & { onClick?: () => void }
  [extraButton: string]: RawTableButton
}

export type ConvertToNormalizedTableButtons<T = {}> = NormalizedTableButtons & T
