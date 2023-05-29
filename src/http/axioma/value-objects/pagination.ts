import type { PaginationStructure } from '../typing'

export class PaginateResult<T> {
  private _results: T[]
  private _count: number

  constructor(private paginationStructure: PaginationStructure, data: T) {
    this._results = this.paginationStructure.results(data)
    this._count = this.paginationStructure.count(data)
  }

  get results() {
    return this._results
  }

  get count() {
    return this._count
  }
}
