export const utils: Record<'button' | 'modal', any> = {
  button: {},
  modal: {},
}

export function setUtils(newUtils: unknown) {
  Object.assign(utils, newUtils)
}
