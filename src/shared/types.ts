export type Dictionary = DictionaryWord[]

export interface DictionaryWord {
  russian: string
  english: string[]
}

export type GetDictionary = PromiseLike<Dictionary>
