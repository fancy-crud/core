import type { AnySchema } from 'valibot'
import { safeParse } from 'valibot'

export function valibotSafeParser(raw: { value: unknown; rule: AnySchema }) {
  if (typeof raw === 'string' || typeof raw === 'boolean')
    return raw

  const { value, rule } = raw
  const result = safeParse(rule, value)

  if (result.success)
    return result.success

  if ('issues' in result && result.issues && result.issues.length > 0) {
    return result.issues[0].message
  }

  return 'Validation failed'
}
