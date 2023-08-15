export function inject<T>(provider: T extends string ? T : { name: string }): any {
  let providerId: string

  if (typeof provider === 'string')
    providerId = provider
  else
    providerId = provider.name

  const Provider = providers.get(providerId)

  if (!Provider)
    throw new Error(`Unable to get provider ${providerId}`)

  return new Provider()
}
