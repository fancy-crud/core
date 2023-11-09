import { providers } from '../axioma'

export class RegisterProvider {
  public execute<T>(provider: T extends { name: string } ? T : string, value?: any) {
    let providerId: string

    if (typeof provider === 'string') {
      if (!value)
        throw new Error('Should specify a provider for naming providers')

      providerId = provider
      providers.set(providerId, value)
    }
    else {
      providerId = provider.name
      providers.set(providerId, provider)
    }

    return providerId
  }
}

export const injectable = new RegisterProvider().execute
