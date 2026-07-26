import type { ZodTypeAny } from 'zod'

export function zodSafeParser(raw: { value: unknown; rule: ZodTypeAny }) {
  if (typeof raw === 'string' || typeof raw === 'boolean')
    return raw

  const { value, rule } = raw
  const result = rule.safeParse(value)

  if (result.success)
    return result.success

  return result.error.issues[0].message
}
