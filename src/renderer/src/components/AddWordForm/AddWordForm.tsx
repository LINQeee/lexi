import { useAppDispatch, useAppSelector } from '@renderer/hooks/redux'
import { wordPackSlice } from '@renderer/store/reducers/WordPackSlice'
import { TranslationModes, Word } from '@renderer/types/types'
import { isFromRu, optimizedDictionaryFilter } from '@renderer/utils/Utils'
import { Dictionary } from '@shared/types'
import { useEffect, useState } from 'react'
import WordInput from '../WordInput/WordInput'
import classes from './AddWordForm.module.css'

const AddWordForm = () => {
  const [mode, setMode] = useState<TranslationModes>(TranslationModes.ENGLISH_RUSSIAN)
  const [userWord, setUserWord] = useState<string>('')
  const [translationWord, setTranslationWord] = useState<string>('')
  const { dictionary } = useAppSelector((state) => state.dictionaryReducer)
  const [userSuggestions, setUserSuggestions] = useState<Dictionary>([])
  const dispatch = useAppDispatch()

  useEffect(
    () => setUserSuggestions(optimizedDictionaryFilter(userWord, dictionary, mode)),
    [userWord]
  )

  const onRussianInput = (event: React.KeyboardEvent<HTMLInputElement>) =>
    setUserWord(event.currentTarget.value)

  const selectSuggestion = (suggestion: Word) => {
    setUserWord(isFromRu(mode) ? suggestion.russian : suggestion.english)
    setTranslationWord(isFromRu(mode) ? suggestion.english : suggestion.russian)
  }

  const onTranslationInputClear = () => {
    setTranslationWord('')
  }

  const switchMode = () => {
    setMode(isFromRu(mode) ? TranslationModes.ENGLISH_RUSSIAN : TranslationModes.RUSSIAN_ENGLISH)
    resetValues()
  }

  const addWord = () => {
    if (!userWord || !translationWord) return
    dispatch(
      wordPackSlice.actions.addWord(
        isFromRu(mode)
          ? {
              russian: userWord,
              english: translationWord
            }
          : { russian: translationWord, english: userWord }
      )
    )
    resetValues()
  }

  const resetValues = () => {
    setUserWord('')
    setTranslationWord('')
  }

  return (
    <div className={classes.wordForm}>
      <div className={classes.inputBox}>
        <WordInput
          translationMode={mode}
          label={isFromRu(mode) ? 'Russian' : 'English'}
          suggestions={userSuggestions}
          value={userWord}
          onInput={onRussianInput}
          onSuggestionClick={selectSuggestion}
        />
        <button
          className={`${classes.switchLanguageButton} ${isFromRu(mode) ? undefined : classes.swapped}`}
          onClick={switchMode}
        >
          <i className="fa-thin fa-arrow-right-arrow-left"></i>
        </button>
        <WordInput
          label={isFromRu(mode) ? 'English' : 'Russian'}
          value={translationWord}
          clearButtonVisible={translationWord.length > 0}
          onInput={(event) => setTranslationWord(event.currentTarget.value)}
          onClear={onTranslationInputClear}
        />
      </div>
      <button className={classes.confirmButton} onClick={addWord}>
        Add Word
      </button>
    </div>
  )
}

export default AddWordForm
