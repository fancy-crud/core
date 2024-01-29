import type { ITableStore, TableState } from '@fancy-crud/core'

const tableStore: Record<symbol, TableState> = reactive({})

export class TableStoreService implements ITableStore {
  private assign<T extends {}>(target: T, source: TableState): asserts target is T & TableState {
    Object.assign(target, source)
  }

  save(id: symbol, payload: TableState): void {
    const state = this.searchById(id) || {}

    this.assign(state, payload)

    tableStore[id] = state
  }

  searchById(id: symbol): TableState | undefined {
    return tableStore[id]
  }

  deleteById(id: symbol): void {
    delete tableStore[id]
  }
}
