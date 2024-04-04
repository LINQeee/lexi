import { IDEntity, TranslationModes, Word } from '@renderer/types/types'
import { Dictionary } from '@shared/types'

export const generateId = (): number => Math.round(Math.random() * 1000)

export const secureGenerateId = (collection: IDEntity[]): number => {
  let id = generateId()
  while (collection.length && collection.some((item) => item.id === id)) id = generateId()

  return id
}

export const generateColor = (): string => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const optimizedDictionaryFilter = (
  wordPart: string,
  dictionary: Dictionary,
  translationMode: TranslationModes
) => {
  if (!wordPart) return []
  const suggestions: Dictionary = []
  for (const word of dictionary) {
    if (suggestions.length > 60) break
    if (
      translationMode === TranslationModes.RUSSIAN_ENGLISH &&
      word.russian.toLowerCase().includes(wordPart.toLowerCase())
    )
      suggestions.push(word)
    else if (
      translationMode === TranslationModes.ENGLISH_RUSSIAN &&
      word.english.some((english) => english.toLowerCase().includes(wordPart.toLowerCase()))
    )
      suggestions.push(word)
  }

  return suggestions
}

export const isFromRu = (translationMode) => translationMode === TranslationModes.RUSSIAN_ENGLISH

export const formatSuggestion = (translationMode: TranslationModes, suggestion: Word) =>
  isFromRu(translationMode)
    ? `${suggestion.russian} - ${suggestion.english}`
    : `${suggestion.english} - ${suggestion.russian}`
