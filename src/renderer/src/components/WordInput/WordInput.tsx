import { TranslationModes, Word } from '@renderer/types/types'
import { formatSuggestion } from '@renderer/utils/Utils'
import { Dictionary } from '@shared/types'
import { FC } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classes from './WordInput.module.css'

interface WordInputProps {
  translationMode?: TranslationModes
  value: string
  onInput: (event: React.KeyboardEvent<HTMLInputElement>) => void
  label: string
  suggestions?: Dictionary
  onSuggestionClick?: (suggestion: Word) => void
  clearButtonVisible?: boolean
  onClear?: () => void
}

const WordInput: FC<WordInputProps> = ({
  label,
  suggestions = [],
  onSuggestionClick = () => {},
  value,
  onInput,
  clearButtonVisible = false,
  onClear = () => {},
  translationMode: mode = TranslationModes.RUSSIAN_ENGLISH
}) => {
  const combinedSuggestions: Word[] = suggestions.flatMap((suggestion) =>
    suggestion.english.map((english) =>
      Object.assign({ russian: suggestion.russian, english: english })
    )
  )

  return (
    <div className={classes.wordInput}>
      <span>{label}</span>
      <input spellCheck={false} required value={value} onInput={onInput} />
      {clearButtonVisible && (
        <button className={classes.clearButton} onClick={onClear}>
          <i className="fa-thin fa-xmark"></i>
        </button>
      )}
      <TransitionGroup
        className={`${classes.suggestions} styled-scrollbar`}
        onClick={(event) => event.preventDefault()}
      >
        {combinedSuggestions.map((suggestion) => (
          <CSSTransition key={suggestion.english} timeout={200} classNames="item">
            <li onClick={() => onSuggestionClick(suggestion)}>
              {formatSuggestion(mode, suggestion)}
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default WordInput
