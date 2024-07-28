import type { IBaseCommand, Meta } from '@fancy-crud/bus'

export class ParseUrlCommand implements IBaseCommand {
  public readonly $meta!: Meta<string>

  constructor(
    public readonly url: string,
    public readonly mode: 'create' | 'update',
    public readonly record: Record<string, any> | null = {},
  ) {}
}
