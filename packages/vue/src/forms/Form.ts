import type { OnFailed, OnSuccess, StandardErrorResponseStructure, StandardResponseStructure } from '@fancy-crud/core'
import { BaseForm, injectable } from '@fancy-crud/core'

export class VueForm extends BaseForm {
  private onSuccessCallback: OnSuccess | null = null
  private onFailedCallback: OnFailed | null = null

  onSuccess(response?: StandardResponseStructure | undefined): void {
    super.onSuccess(response)

    if (this.onSuccessCallback)
      this.onSuccessCallback(response)
  }

  onFailed(error?: StandardErrorResponseStructure | undefined): void {
    super.onFailed(error)
    if (this.onFailedCallback)
      this.onFailedCallback(error)
  }

  setOnSuccessCallback(callback: OnSuccess) {
    this.onSuccessCallback = callback
  }

  setOnFailedCallback(callback: OnFailed) {
    this.onFailedCallback = callback
  }
}

injectable('IBaseForm', VueForm)
