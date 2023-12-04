import { Bus, inject, injectable } from '@fancy-crud/bus'

import type { StandardErrorResponseStructure, StandardResponseStructure } from '../axioma'
import { DispatchOnFailedFormEventCommand, DispatchOnSuccessFormEventCommand, IFormStore, SaveFormCommand } from '../axioma'

export class BaseForm {
  protected readonly bus = new Bus()
  private id!: symbol

  constructor(
    protected readonly formStore: IFormStore = inject(IFormStore.name),
  ) {}

  setFormId(id: symbol) {
    this.id = id
  }

  onSuccess(response?: StandardResponseStructure) {
    this.bus.execute(
      new DispatchOnSuccessFormEventCommand(this.id, { response }),
    )
  }

  onFailed(error?: StandardErrorResponseStructure) {
    this.bus.execute(
      new DispatchOnFailedFormEventCommand(this.id, error),
    )
  }

  save() {
    const onSuccess = (response?: StandardResponseStructure) => this.onSuccess(response)
    const onFailed = (error?: StandardErrorResponseStructure) => this.onFailed(error)

    this.bus.execute(
      new SaveFormCommand(this.id, {
        onSuccess,
        onFailed,
      }),
    )
  }

  onMainClick() {
    const form = this.formStore.searchById(this.id)!

    if (typeof form.buttons.main.onClick === 'function') {
      form.buttons.main.onClick()
      return
    }

    this.save()
  }

  onAuxClick() {
    const form = this.formStore.searchById(this.id)!

    if (typeof form.buttons.aux.onClick === 'function')
      form.buttons.aux.onClick()
  }
}

injectable('IBaseForm', BaseForm)
