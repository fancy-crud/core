import type { ZodAny } from 'zod/lib/types'

export function processResult(raw: { value: unknown; rule: ZodAny }) {
  const { value, rule } = raw
  const result = rule.safeParse(value)

  if (result.success)
    return result.success

  return result.error.issues[0].message
}
