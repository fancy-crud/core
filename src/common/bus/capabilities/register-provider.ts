import { providers } from '../axioma'

export class RegisterProvider {
  public execute(provider: any, dependencies: symbol[] = []) {
    const providerKey = Symbol(provider.name)
    providers.set(providerKey, { provider, dependencies })

    return providerKey
  }
}

export const registerProvider = new RegisterProvider()
