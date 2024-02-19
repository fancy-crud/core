export type EventHandlers<E = {}> = {
  [K in keyof E]?: E[K] extends (...args: any) => any ? E[K] : (payload?: E[K]) => void
}

export interface ButtonEvent {
  onClick: Function
  onDblclick: Function
  onMousedown: Function
  onMousemove: Function
  onMouseup: Function
  onMouseover: Function
  onMouseout: Function
  onMouseenter: Function
  onMouseleave: Function
  onSubmit: Function
  onChange: Function
  onFocus: Function
  onBlur: Function
  onInput: Function
  onDrag: Function
  onDrop: Function
}

export interface RawButton extends Partial<ButtonEvent> {
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

export interface NormalizedButton extends RawButton, Partial<ButtonEvent> {
  label: string
  hidden: boolean
  isLoading: boolean
  class: string
}

export interface NormalizedFormButtons {
  main: NormalizedButton
  aux: NormalizedButton
  [extraButton: string]: RawButton
}

export type ConvertToNormalizedFormButtons<T = {}> = NormalizedFormButtons & T

export type ButtonType = 'main' | 'aux'

export type NormalizedButtons<T> = { [K in keyof T]: NormalizedButton & T[K] }

export interface ObjectWithRawButtons extends Record<string, RawButton> {}
export interface ObjectWithNormalizedButtons extends Record<string, NormalizedButton> {}
