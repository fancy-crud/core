import { injectable } from '@fancy-crud/bus'
import type { TableState } from '../axioma'
import { ITableStore, tableStore } from '../axioma'

export class TableStoreService implements ITableStore {
  private assign<T extends {}>(target: T, source: TableState): asserts target is T & TableState {
    Object.assign(target, source)
  }

  save(id: symbol, payload: TableState): void {
    const state = this.searchById(id) || {}

    this.assign(state, payload)

    tableStore.set(id, state)
  }

  searchById(id: symbol): TableState | undefined {
    return tableStore.get(id)
  }

  deleteById(id: symbol): void {
    tableStore.delete(id)
  }
}

injectable(ITableStore.name, TableStoreService)
