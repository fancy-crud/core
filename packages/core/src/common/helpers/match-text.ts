export function matchText(text?: string): { left: string; right: string } {
  const result = {
    left: text || '',
    right: text || '',
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
    result.left = extractedText
    result.right = extractedText

    if (matches[2])
      result.right = matches[2].trim()
  }

  return result
}
