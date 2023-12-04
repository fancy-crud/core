import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'
import type { BaseFormField, ObjectWithNormalizedColumns, ObjectWithRawColumns } from '@packages/core/tables/axioma'

export class NormalizeColumnsCommand implements BaseCommand {
  public readonly meta = meta(INormalizeColumnsHandler)

  constructor(
    public readonly columns: ObjectWithRawColumns,
    public readonly fields?: BaseFormField,
  ) {}
}

export abstract class INormalizeColumnsHandler {
  abstract execute({ fields, columns }: NormalizeColumnsCommand): ObjectWithNormalizedColumns
}
