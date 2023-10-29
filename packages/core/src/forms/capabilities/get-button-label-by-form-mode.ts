import { FORM_MODE } from '@packages/core/forms/axioma'
import type { GetButtonLabelByFormModeCommand, IGetButtonLabelByFormModeHandler } from '../axioma'

export class GetButtonLabelByFormModeHandler implements IGetButtonLabelByFormModeHandler {
  private matchText(text?: string): { create: string; update: string } {
    const result = {
      create: text || '',
      update: text || '',
    }

    if (!text)
      return result

    // Inspect for match:
    // "{{ CreateText }}"
    // "{{ CreateText | UpdateText }}"
    const regex = /{{\s*([^|{}]+)(?:\s*\|\s*([^|{}]+))?}}/
    const matches = text.match(regex)

    if (matches) {
      const extractedText = matches[1].trim()
      result.create = extractedText
      result.update = extractedText

      if (matches[2])
        result.update = matches[2].trim()
    }

    return result
  }

  execute({ mode, text }: GetButtonLabelByFormModeCommand): string {
    const label = this.matchText(text)
    return mode === FORM_MODE.create ? label.create : label.update
  }
}
