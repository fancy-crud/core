import type { CustomColumnsOrderCommand, ICustomColumnsOrderHandler } from '@packages/core/tables/axioma'

export class CustomColumnsOrderHandler implements ICustomColumnsOrderHandler {
  private reorderColumns(originalColumns: string[], columnsOrder: string[]): string[] {
    let clonedColumnsOrder: Array<string | symbol> = [...columnsOrder]

    const ids: symbol[] = []

    const _columnsOrder = clonedColumnsOrder.reduce((obj, column, index) => {
      if (column === '...') {
        const id = Symbol(column)
        obj[id] = []
        ids.push(id)
        clonedColumnsOrder[index] = id
        return obj
      }

      obj[column] = []
      return obj
    }, {} as Record<string | symbol, string[]>)

    if (!ids.length) {
      const id = Symbol('...')
      _columnsOrder[id] = []
      ids.push(id)
      clonedColumnsOrder = [...clonedColumnsOrder, id]
    }

    let indexId = 0
    let updateIndex = false

    for (const column of originalColumns) {
      if (!_columnsOrder[column]) {
        if (updateIndex)
          indexId++

        _columnsOrder[ids[indexId]]?.push(column)
        updateIndex = false
        continue
      }

      _columnsOrder[column] = [column]

      if (ids.length > 1 && _columnsOrder[ids[indexId]]?.length && ids[indexId + 1])
        updateIndex = true
    }

    const output: string[] = clonedColumnsOrder.reduce((prev, curr) => {
      return [...prev, ..._columnsOrder[curr]]
    }, [] as string[])

    return output
  }

  private removeDuplicates(array: string[]): string[] {
    const uniqueValues: string[] = []
    const ellipsisIndices: number[] = []

    array.forEach((item, index) => {
      if (item === '...')
        ellipsisIndices.push(index)
      else if (!uniqueValues.includes(item))
        uniqueValues.push(item)
    })

    ellipsisIndices.forEach((index) => {
      uniqueValues.splice(index, 0, '...')
    })

    return uniqueValues
  }

  execute<T extends Record<string, any>>({ columns, order }: CustomColumnsOrderCommand<T>): T {
    const originalColumns = Object.keys(columns)
    const reorderedColumns = this.reorderColumns(originalColumns, this.removeDuplicates(order))

    const columnsOrder = reorderedColumns.reduce((obj, column) => {
      obj[column] = columns[column]
      return obj
    }, {} as Record<string, any>)

    return columnsOrder as T
  }
}
