import type { ButtonEvent, EventHandlers, RawButton } from '@packages/core/forms/axioma'

export interface RawTableButton extends RawButton {}

export interface RawTableButtons {
  add?: RawTableButton
  edit?: RawTableButton
  remove?: RawTableButton
  dump?: RawTableButton
  [extraButton: string]: RawTableButton | undefined
}

export interface NormalizedTableButton extends RawTableButton, EventHandlers<Partial<ButtonEvent>> {}

export interface NormalizedTableButtons {
  add: NormalizedTableButton
  edit: NormalizedTableButton
  remove: NormalizedTableButton
  dump: NormalizedTableButton
  [extraButton: string]: RawTableButton
}

export type ConvertToNormalizedTableButtons<T extends RawTableButtons> = NormalizedTableButtons & { [K in keyof T]: NormalizedTableButton }
