export function exportComponents(components: Record<string, any>) {
  const exportable: any = {}

  function getName(key: string) {
    return key.substring(location.pathname.lastIndexOf('/') + 2).split('.vue')[0]
  }

  Object.entries(components).forEach(([key, value]) => {
    const keyName: string = value.name ? value.name : getName(key)

    exportable[keyName] = value.default
  })
}

export default exportComponents(import.meta.glob('./**/*.vue'))
