export type EventHandlers<E = {}> = {
  [K in keyof E]?: E[K] extends (...args: any) => any ? E[K] : (payload?: E[K]) => void
}

export interface ButtonEvent {
  onClick: MouseEvent
  onDblclick: MouseEvent
  onMousedown: MouseEvent
  onMousemove: MouseEvent
  onMouseup: MouseEvent
  onMouseover: MouseEvent
  onMouseout: MouseEvent
  onMouseenter: MouseEvent
  onMouseleave: MouseEvent
  onSubmit: Event
  onChange: Event
  onFocus: FocusEvent
  onBlur: FocusEvent
  onInput: InputEvent
  onDrag: DragEvent
  onDrop: DragEvent
}

export interface RawButton extends EventHandlers<Partial<ButtonEvent>> {
  label?: { create?: string; update?: string }
  isLoading?: boolean
  icon?: string
  class?: string
  isDisabled?: boolean
}

export interface NormalizedButton extends RawButton, EventHandlers<Partial<ButtonEvent>> {
  label: { create: string; update: string }
  isLoading: boolean
  icon: string
  class: string
}

export type ButtonType = 'main' | 'aux'

export type NormalizedButtons<T> = T & Record<string, NormalizedButton>

export interface ObjectWithRawButtons extends Record<string, RawButton> {}
export interface ObjectWithNormalizedButtons extends Record<string, NormalizedButton> {}
