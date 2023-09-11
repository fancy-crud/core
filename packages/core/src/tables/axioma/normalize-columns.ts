import type { BaseCommand } from '@packages/core/common/bus/axioma'
import { meta } from '@packages/core/common/bus/capabilities'
import type { BaseFormField, ObjectWithNormalizedColumns, ObjectWithRawColumns } from '@packages/core/tables/axioma'

export class NormalizeColumnsCommand implements BaseCommand {
  public readonly meta = meta(INormalizeColumnsHandler)

  constructor(
    public readonly fields: BaseFormField,
    public readonly columns: ObjectWithRawColumns,
  ) {}
}

export abstract class INormalizeColumnsHandler {
  abstract execute({ fields, columns }: NormalizeColumnsCommand): ObjectWithNormalizedColumns
}
