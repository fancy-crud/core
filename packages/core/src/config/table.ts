export const table: Record<'body', any> = {
  body: {},
}

export function setTable(newTable: unknown) {
  Object.assign(table, newTable)
}
