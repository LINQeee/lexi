import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dictionary } from '@shared/types'

export interface DictionaryState {
  dictionary: Dictionary
  suggestions: string[]
  translations: string[]
}

const initialState: DictionaryState = {
  dictionary: await window.context.getDictionary(),
  suggestions: [],
  translations: []
}

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    fetchTranslations(state, action: PayloadAction<string>) {
      state.translations =
        state.dictionary.find((translation) => translation.russian === action.payload)?.english ||
        []
    },
    fetchSuggestions(state, action: PayloadAction<string>) {
      state.suggestions =
        state.dictionary
          .filter((translation) => translation.russian.includes(action.payload))
          .map((filtered) => filtered.russian) || []
    },
    resetState(state) {
      state.suggestions = []
      state.translations = []
    }
  }
})

export default dictionarySlice.reducer
