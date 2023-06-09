export const fields: Record<string, any> = {}

export function setFields(newFields: unknown) {
  Object.assign(fields, newFields)
}
