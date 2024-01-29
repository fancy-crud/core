import type { ButtonEvent, EventHandlers, RawButton } from '@packages/core/forms/axioma'
import type { Row } from './table'

export interface RawTableButton extends RawButton {}

export interface OnRowClick { onClick?: (row: Row) => void }
export type EditButton = RawTableButton & OnRowClick

export interface RawTableButtons {
  add?: RawTableButton
  edit?: EditButton
  remove?: RawTableButton
  dump?: RawTableButton
  [extraButton: string]: RawTableButton | undefined
}

export interface NormalizedTableButton extends RawTableButton, EventHandlers<Partial<ButtonEvent>> {
  onClick: any
}

export interface NormalizedTableButtons {
  add: NormalizedTableButton
  edit: NormalizedTableButton & OnRowClick
  remove: NormalizedTableButton & OnRowClick
  dump: NormalizedTableButton
  [extraButton: string]: RawTableButton
}

export type ConvertToNormalizedTableButtons<T extends RawTableButtons> = NormalizedTableButtons & { [K in keyof T]: K extends EditButton ? (NormalizedTableButton & { onClick: (row: Row) => void }) : NormalizedTableButton }
