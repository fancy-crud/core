import type { Component } from 'vue'
import Button from './Button.vue'
import Modal from './Modal.vue'

export const utils = ReturnObject({
  button: Button,
  modal: Modal,
})

export function ReturnObject<T extends Record<string, Component>>(obj: T): Record<keyof T, Component> {
  return { ...obj }
}
