export type EventHandlers<E = {}> = {
  [K in keyof E]?: E[K] extends (...args: any) => any ? E[K] : (payload?: E[K]) => void
}

export interface ButtonEvent {
  onClick: any
  onDblclick: any
  onMousedown: any
  onMousemove: any
  onMouseup: any
  onMouseover: any
  onMouseout: any
  onMouseenter: any
  onMouseleave: any
  onSubmit: any
  onChange: any
  onFocus: any
  onBlur: any
  onInput: any
  onDrag: any
  onDrop: any
}

export interface RawButton extends EventHandlers<Partial<ButtonEvent>> {
  label?: string
  isLoading?: boolean
  icon?: string
  class?: string
  isDisabled?: boolean
  hidden?: boolean
  [key: string]: unknown
}

export interface RawFormButtons {
  main?: RawButton
  aux?: RawButton
  [extraButton: string]: RawButton | undefined
}

export interface NormalizedButton extends RawButton, EventHandlers<Partial<ButtonEvent>> {
  hidden: boolean
  isLoading: boolean
  class: string
}

export interface NormalizedFormButtons {
  main: NormalizedButton
  aux: NormalizedButton
  [extraButton: string]: RawButton
}

export type ConvertToNormalizedFormButtons<T extends RawFormButtons> = NormalizedFormButtons & { [K in keyof T]: NormalizedButton }

export type ButtonType = 'main' | 'aux'

export type NormalizedButtons<T> = T & Record<string, NormalizedButton>

export interface ObjectWithRawButtons extends Record<string, RawButton> {}
export interface ObjectWithNormalizedButtons extends Record<string, NormalizedButton> {}
