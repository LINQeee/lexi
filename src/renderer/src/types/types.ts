export enum TranslationModes {
  RUSSIAN_ENGLISH,
  ENGLISH_RUSSIAN
}

export enum GameModes {
  RUSSIAN_ENGLISH = 'russian-english',
  ENGLISH_RUSSIAN = 'english-russian'
}

export const toGameModes = (value: string) => {
  switch (value) {
    case GameModes.RUSSIAN_ENGLISH:
      return GameModes.RUSSIAN_ENGLISH
    case GameModes.ENGLISH_RUSSIAN:
      return GameModes.ENGLISH_RUSSIAN
  }

  return GameModes.RUSSIAN_ENGLISH
}

export interface WordPack extends IDEntity {
  name: string
  isForm?: boolean
  colorTag: string
}

export interface Word extends IDEntity {
  russian: string
  english: string
  favorite: boolean
  wordPackId?: number
}

export interface IDEntity {
  id: number
}

export interface ChangeWordPackAction {
  wordId: number
  wordPackId: number
}

export interface ChangeWordPackColorAction {
  wordPackId: number
  newColor: string
}
