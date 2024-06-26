import type { ZodAny } from 'zod/lib/types'

export function zodSafeParser(raw: { value: unknown; rule: ZodAny }) {
  if (typeof raw === 'string' || typeof raw === 'boolean')
    return raw

  const { value, rule } = raw
  const result = rule.safeParse(value)

  if (result.success)
    return result.success

  return result.error.issues[0].message
}
