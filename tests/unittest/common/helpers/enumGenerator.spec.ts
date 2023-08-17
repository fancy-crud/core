import { enumGenerator } from '@packages/core/common/helpers'

describe('enumGenerator', () => {
  it('should generate an enum object', () => {
    const colors = ['RED', 'GREEN', 'BLUE']
    const result = enumGenerator(colors)

    const expectedEnum = {
      RED: 'RED',
      GREEN: 'GREEN',
      BLUE: 'BLUE',
    }

    expect(result).toEqual(expectedEnum)
  })

  it('should generate an empty enum object for an empty array', () => {
    const emptyArray: string[] = []
    const result = enumGenerator(emptyArray)

    expect(result).toEqual({})
  })

  it('should generate an enum object with a single element', () => {
    const singleElementArray = ['SINGLE']
    const result = enumGenerator(singleElementArray)

    const expectedEnum = {
      SINGLE: 'SINGLE',
    }

    expect(result).toEqual(expectedEnum)
  })

  it('should handle a large array', () => {
    const largeArray = Array.from(Array(1000), (_, index) => `VALUE_${index}`)
    const result = enumGenerator(largeArray)

    const expectedEnum: { [key: string]: string } = {}
    for (const item of largeArray)
      expectedEnum[item] = item

    expect(result).toEqual(expectedEnum)
  })
})
