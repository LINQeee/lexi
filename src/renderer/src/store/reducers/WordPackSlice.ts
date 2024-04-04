import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  ChangeWordPackAction,
  ChangeWordPackColorAction,
  GameModes,
  Word,
  WordPack
} from '@renderer/types/types'
import { generateColor, generateId, secureGenerateId } from '@renderer/utils/Utils'

export enum Pages {
  HOME = 'home',
  WORD_PACK = 'word_pack',
  PAIR_GAME = 'pair_game'
}

export interface WordPackState {
  wordPacks: WordPack[]
  activeWordPackId?: number
  currentPage: Pages
  gameMode?: GameModes
  allWords: Word[]
}

const initialState: WordPackState = {
  wordPacks: JSON.parse(localStorage.getItem('wordPacks')!) || [
    { colorTag: '#edd900', id: generateId(), name: 'favorites' }
  ],
  currentPage: Pages.HOME,
  allWords: JSON.parse(localStorage.getItem('allWords')!) || []
}

export const wordPackSlice = createSlice({
  name: 'wordPack',
  initialState,
  reducers: {
    startPairGame(state, action: PayloadAction<GameModes>) {
      state.currentPage = Pages.PAIR_GAME
      state.gameMode = action.payload
    },
    addWordPack(state, action: PayloadAction<WordPack>) {
      state.wordPacks = [...state.wordPacks, action.payload]
    },
    selectWordPack(state, action: PayloadAction<number>) {
      if (state.wordPacks.find((item) => item.id === action.payload)?.isForm) return
      state.activeWordPackId = action.payload
      state.currentPage = Pages.WORD_PACK
    },
    unselectWordPack: (state) => resetState(state),
    deleteSelectedWordPack(state) {
      if (!state.activeWordPackId) return
      state.wordPacks = state.wordPacks.filter((wordPack) => wordPack.id !== state.activeWordPackId)
      state.allWords.forEach((word) => {
        if (word.wordPackId === state.activeWordPackId) word.wordPackId = undefined
      })
      resetState(state)
    },
    openWordPackForm(state) {
      if (state.wordPacks.some((item) => item.isForm)) return
      state.wordPacks = [
        {
          id: secureGenerateId(state.wordPacks),
          name: '',
          isForm: true,
          colorTag: generateColor()
        },
        ...state.wordPacks
      ]
    },
    closeWordPackForm(state) {
      state.wordPacks = state.wordPacks.filter((item) => !item.isForm)
    },
    confirmWordPackForm(state, action: PayloadAction<string>) {
      const wordPackForm = state.wordPacks.find((wordPack) => wordPack.isForm)
      if (!wordPackForm) return
      wordPackForm.isForm = false
      wordPackForm.name = action.payload
    },
    addWord(state, action: PayloadAction<Omit<Word, 'id' | 'favorite' | 'wordPackId'>>) {
      state.allWords = [
        ...state.allWords,
        {
          ...action.payload,
          id: secureGenerateId(state.allWords),
          favorite: false,
          wordPackId: state.activeWordPackId
        }
      ]
    },
    removeWord(state, action: PayloadAction<number>) {
      state.allWords = state.allWords.filter((word) => word.id !== action.payload)
    },
    changeWordPack(state, action: PayloadAction<ChangeWordPackAction>) {
      state.allWords.forEach((word) => {
        if (word.id === action.payload.wordId) word.wordPackId = action.payload.wordPackId
      })
    },
    switchWordFavorite(state, action: PayloadAction<number>) {
      const word = findWord(state.allWords, action.payload)
      if (word) word.favorite = !word.favorite
    },
    removeWordFromWordPack(state, action: PayloadAction<number>) {
      const word = findWord(state.allWords, action.payload)
      if (word) word.wordPackId = undefined
    },
    changeWordPackColor(state, action: PayloadAction<ChangeWordPackColorAction>) {
      const wordPack = findWordPack(state.wordPacks, action.payload.wordPackId)
      if (wordPack) wordPack.colorTag = action.payload.newColor
    }
  }
})

const findWord = (allWords: Word[], id: number) => allWords.find((word) => word.id === id)

const findWordPack = (wordPacks: WordPack[], id: number) =>
  wordPacks.find((wordPack) => wordPack.id === id)

const resetState = (state: WordPackState) => {
  state.activeWordPackId = undefined
  state.currentPage = Pages.HOME
}

export default wordPackSlice.reducer
